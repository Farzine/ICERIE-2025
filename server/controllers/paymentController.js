const request = require("request");
const Attendee = require("../models/attendee");
const PDFDocument = require("pdfkit");
const axios = require("axios");
const dotenv = require("dotenv");
const earlyBirdDeadline = new Date("2025-03-25T23:59:59Z");
const regularDeadline = new Date("2025-04-10T23:59:59Z");

dotenv.config();

exports.initiatePayment = async (req, res) => {
  const { attendeeId, paperId } = req.params;
  console.log("AttendeeId:", attendeeId);
  console.log("PaperId:", paperId);

  try {
    // 1) Find the attendee
    const attendee = await Attendee.findById(attendeeId);
    console.log("Attendee:", attendee);
    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }

    // 2) Find the specific paper
    const paper = attendee.papers.find((p) => p.paperId === paperId);
    console.log("Paper:", paper);
    if (!paper) {
      return res
        .status(404)
        .json({ error: "Paper not found for this attendee" });
    }

    // If already paid for this paper, no need to pay again
    if (paper.payment_status) {
      return res.status(400).json({ error: "This paper is already paid" });
    }

    // 3) Calculate the amount to charge for this paper
    const currentDate = new Date();
    // Calculate amount based on the current date and deadline
    const amount = (() => {
      if (currentDate <= earlyBirdDeadline) {
        return attendee.early_bird_fee;
      } else if (currentDate <= regularDeadline) {
        return attendee.regular_fee;
      } else {
        // Instead of returning directly, we'll throw so we can catch it
        throw new Error("Payment deadline has passed");
      }
    })();

    // Handle deadline passed case
    if (!amount) {
      return res.status(400).json({ message: "Payment deadline has passed" });
    }

    // 5) The redirect URL could lead user back to front-end for that paper
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/attendee/${attendeeId}/papers/${paperId}`;

    // 6) Prepare request to your payment gateway
    const options = {
      method: "POST",
      url: "https://epayment.sust.edu/api/payment/create/icerie",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        "User-Agent": "insomnia/10.3.0",
        Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
      },
      formData: {
        name: attendee.name,
        // “reg” can be combination of attendee+paper or just the paperId
        // as the payment reference
        reg: `${attendeeId}-${paperId}`, // akhne problem hote pare
        amount: amount,
        email: attendee.email,
        mobile: attendee.phone,
        ipn_url: `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/payment/ipn`,
        redirect_url: redirectUrl,
      },
    };

    request(options, async (error, response, body) => {
      if (error) {
        console.error("Payment initiation error:", error);
        return res.status(500).json({ error: "Payment initiation failed" });
      }
      console.log("Options:", options);

      try {
        const responseData = JSON.parse(body);
        console.log("Payment gateway response:", responseData);

        if (
          responseData.status === "success" &&
          responseData.data.redirectURL
        ) {
          // Store the paper's val_id
          if (responseData.data.paymentID) {
            paper.val_id = responseData.data.paymentID;
            await attendee.save();
            console.log(
              `Payment initiated for Paper ${paper.paperId} of ${attendee.name}, paperValId: ${paper.val_id}`
            );
          }

          return res.json({ url: responseData.data.redirectURL });
        } else {
          console.error("Payment gateway error:", responseData);
          return res.status(400).json({ error: "Failed to initiate payment" });
        }
      } catch (parseError) {
        console.error("Error parsing payment response:", parseError, body);
        return res
          .status(500)
          .json({ error: "Invalid response from payment gateway" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.handleIPN = async (req, res) => {
  console.log("IPN received:", req.body);

  try {
    const { paymentID, reg, amount, status, transaction_id } = req.body;
    console.log("IPN received:", req.body);

    // “reg” might look like "attendeeId-paperId"
    // or just attendeeId if you kept the original approach
    let attendee;
    let paperId;

    if (reg.includes("-")) {
      const [attendeeId, pId] = reg.split("-");
      paperId = pId;
      console.log("PaperId at handlePIN:", paperId);
      attendee = await Attendee.findById(attendeeId);
    } else {
      // fallback for original approach
      const attendeeId = reg.includes("-") ? reg.split("-")[0] : reg;
      console.log("AttendeeId at handlePIN:", attendeeId);
      attendee = await Attendee.findById(attendeeId);
    }

    if (!attendee) {
      console.error(
        `❌ Attendee not found for payment ID: ${paymentID}, reg: ${reg}`
      );
      return res.status(404).json({ error: "Attendee not found" });
    }

    // If we have a paperId, find that paper
    let paper;
    if (paperId) {
      paper = attendee.papers.find((p) => p.paperId === paperId);
    }

    // If we found a paper, update the paper’s payment status and val_id
    if (paper) {
      console.log("Paper found:", paper);
      if (
        status === "SUCCESS" ||
        status === "VALID" ||
        status === "VALIDATED"
      ) {
        paper.payment_status = true;
        paper.val_id = paymentID;
        paper.transaction_id = transaction_id || null;
        await attendee.save();
        console.log(
          `✅ Payment successful for Paper ${paperId}, Attendee ${attendee.name}`
        );
      } else {
        console.log(
          `❌ Payment failed for Paper ${paperId}, Status: ${status}`
        );
      }

      return res.status(200).json({ message: "IPN received" });
    } else {
      return res.status(404).json({ message: "No matching paper found" });
    }
  } catch (error) {
    console.error("Error processing IPN:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.checkPaymentStatus = async (req, res) => {
  const { attendeeId, paperId } = req.params;
  console.log("AttendeeId:", attendeeId);
  console.log("PaperId:", paperId);

  try {
    const attendee = await Attendee.findById(attendeeId);
    console.log("Attendee at checkPaymentStatus:", attendee);
    if (!attendee) return res.status(404).json({ error: "Attendee not found" });

    const paper = attendee.papers.find((p) => p.paperId === paperId);
    console.log("Paper at checkPaymentStatus:", paper);
    if (!paper) {
      return res
        .status(404)
        .json({ error: "Paper not found for this attendee" });
    }

    // 2) (Optional) Re-check payment status with the gateway
    if (paper.val_id) {
      try {
        const paymentValidationUrl = `https://epayment.sust.edu/api/payment/status/${paper.val_id}`;
        console.log("Payment validation URL:", paymentValidationUrl);

        const paymentResponse = await axios.post(paymentValidationUrl);
        // Suppose "200" indicates a valid/confirmed payment
        if (paymentResponse.data.status === "200") {
          console.log(`Paper ${paper.paperId} paid successfully 💸`);
          paper.payment_status = true;
          // Optionally update paper.transaction_id if the gateway returns it
          paper.transaction_id =
            paymentResponse.data.transaction_id || paper.transaction_id;
        }
      } catch (error) {
        console.log("Error verifying paper:", paper.paperId, error.message);
      }
    }
    // 3) Save any updates
    await attendee.save();

    return res.json({
      _id: attendee._id,
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phone,
      category: attendee.category,
      university: attendee.university,
      photoUrl: attendee.photoUrl,
      visaSupport: attendee.visaSupport,
      tourInterested: attendee.tourInterested,
      // Return the entire `papers` array, now updated
      papers: attendee.papers,
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a manual payment update endpoint for testing or admin use
exports.updatePaymentStatus = async (req, res) => {
  const { attendeeId, paperId } = req.params; // Get paperId from query

  try {
    const attendee = await Attendee.findById(attendeeId);
    if (!attendee) return res.status(404).json({ error: "Attendee not found" });

    // If paperId provided, update payment for specific paper
    if (paperId) {
      const paper = attendee.papers.find((p) => p.paperId === paperId);
      if (!paper) {
        return res
          .status(404)
          .json({ error: "Paper not found for this attendee" });
      }

      paper.payment_status = true;
      // Generate a dummy transaction ID for tracking
      paper.transaction_id = `MANUAL-${Date.now()}`;
      await attendee.save();

      console.log(
        `✅ Payment manually marked as successful for Paper ${paperId} of ${attendee.name}`
      );

      return res.json({
        success: true,
        message: `Payment status updated for Paper ${paperId} of ${attendee.name}`,
      });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Download a PDF payslip for the given attendee (and optionally a specific paper).
 * Example GET /payment/paySlip/:id/paper/:paperId
 */
exports.downloadPaySlip = async (req, res) => {
  try {
    const { attendeeId, paperId } = req.params; // If you want a single paper's slip

    // 1) Find the attendee
    const attendee = await Attendee.findById(attendeeId);
    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }

    // 2) For a "paper-level" slip, find the specific paper
    let paper = null;
    if (paperId) {
      paper = attendee.papers.find((p) => p.paperId === paperId);
      if (!paper) {
        return res
          .status(404)
          .json({ error: "Paper not found for this attendee" });
      }

      // Only allow generating receipts for paid papers
      if (!paper.payment_status) {
        return res
          .status(400)
          .json({ error: "Cannot generate receipt for unpaid paper" });
      }
    }

    // 3) Create a new PDF document
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    // 4) Set response headers to trigger a download
    const filename = `payslip_${attendeeId}${paperId ? "_" + paperId : ""}.pdf`;
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    res.setHeader("Content-Type", "application/pdf");

    // Pipe PDF data to the response
    doc.pipe(res);

    // 5) Add a title and some styling
    doc
      .fontSize(18)
      .text("ICERIE 2025 Conference - Payment Receipt", { align: "center" })
      .moveDown();

    // 6) Add attendee info
    doc
      .fontSize(12)
      .text(`Name: ${attendee.name}`)
      .text(`Email: ${attendee.email}`)
      .text(`University: ${attendee.university || "Not specified"}`)
      .text(`Category: ${attendee.category || "Not specified"}`)
      .moveDown();

    // 7) If it's a single-paper slip, show details about that paper
    if (paper) {
      doc
        .fontSize(14)
        .text("Paper Payment Details:", { underline: true })
        .moveDown(0.5);

      doc.fontSize(12).text(`Paper ID: ${paper.paperId}`);
      doc.text(`Track: ${paper.track}`);

      // Only include these fields if they exist
      if (paper.proceedingsPublication !== undefined) {
        doc.text(`Proceedings Publication: ${paper.proceedingsPublication}`);
      }
      if (paper.fullPaperPublication !== undefined) {
        doc.text(`Full Paper Publication: ${paper.fullPaperPublication}`);
      }
      if (paper.presentationType !== undefined) {
        doc.text(`Presentation Type: ${paper.presentationType}`);
      }
      doc.moveDown();

      // Payment details
      doc.text(`Payment Status: Paid`);
      if (paper.transaction_id) {
        doc.text(`Transaction ID: ${paper.transaction_id}`);
      }
      if (paper.val_id) {
        doc.text(`Payment Reference (val_id): ${paper.val_id}`);
      }

      // You could also display `payment_date` or other fields if you have them
      // doc.text(`Payment Date: ${paper.payment_date || "Unknown"}`);

    } else {
      // 8) If no paperId, show a summary of all paid papers
      doc
        .fontSize(14)
        .text("Papers Payment Summary:", { underline: true })
        .moveDown(0.5);

      const paidPapers = attendee.papers.filter((p) => p.payment_status);

      if (paidPapers.length === 0) {
        doc.fontSize(12).text("No paid papers found for this attendee.");
      } else {
        paidPapers.forEach((paper, i) => {
          doc.fontSize(12).text(`Paper ${i + 1}:`);
          doc.text(`   Paper ID: ${paper.paperId}`);
          doc.text(`   Track: ${paper.track}`);
          if (paper.transaction_id) {
            doc.text(`   Transaction ID: ${paper.transaction_id}`);
          }
          if (paper.val_id) {
            doc.text(`   Payment Reference: ${paper.val_id}`);
          }
          doc.moveDown(0.5);
        });
      }
    }

    // 9) Closing note
    doc.moveDown();
    doc.text(
      "Thank you for your payment. We look forward to your participation!",
      { italic: true }
    );
    doc.moveDown();
    doc.text(`Receipt generated on: ${new Date().toLocaleDateString()}`);

    // 10) Finalize the PDF and end the response
    doc.end();
    // The PDF data will stream to the client, prompting a file download
  } catch (error) {
    console.error("Error generating payslip PDF:", error);
    res.status(500).json({ error: "Could not generate PDF" });
  }
};
