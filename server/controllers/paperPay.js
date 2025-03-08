const request = require("request")
const Attendee = require("../models/attendee")
const PDFDocument = require("pdfkit");
const dotenv = require("dotenv")

dotenv.config()

exports.initiatePayment = async (req, res) => {
  const attendeeId = req.params.id
  try {
    const attendee = await Attendee.findById(attendeeId)
    if (!attendee) return res.status(404).json({ error: "Attendee not found" })

    const currentDate = new Date()
    const earlyBirdDeadline = new Date("2025-04-10T23:59:59Z")
    const amount = attendee.payment_status
      ? 0
      : currentDate <= earlyBirdDeadline
        ? attendee.early_bird_fee
        : attendee.regular_fee

    if (amount === 0) {
      return res.status(400).json({ error: "No payment required" })
    }

    // The redirect URL should match the catch-all route format
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/attendee/${attendeeId}`

    const options = {
      method: "POST",
      url: "https://epayment.sust.edu/api/payment/create/icerie",
      headers: {
        "Content-Type": "multipart/form-data; boundary=---011000010111000001101001",
        "User-Agent": "insomnia/10.3.0",
        Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
      },
      formData: {
        name: attendee.name,
        reg: attendeeId,
        amount: amount,
        email: attendee.email,
        mobile: attendee.phone,
        ipn_url: `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/payment/ipn`,
        redirect_url: redirectUrl,
      },
    }

    request(options, async (error, response, body) => {
      if (error) {
        console.error("Payment initiation error:", error)
        return res.status(500).json({ error: "Payment initiation failed" })
      }

      try {
        const responseData = JSON.parse(body)
        console.log("Payment gateway response:", responseData)

        if (responseData.status === "success" && responseData.data.redirectURL) {
          // Store the payment ID in the attendee record
          if (responseData.data.paymentID) {
            attendee.val_id = responseData.data.paymentID
            await attendee.save()
            console.log(`Payment initiated for ${attendee.name}, val_id: ${attendee.val_id}`)
            console.log(`Val_id matching: ${attendee.val_id === responseData.data.paymentID}`)
          }
          return res.json({ url: responseData.data.redirectURL })
        } else {
          console.error("Payment gateway error:", responseData)
          return res.status(400).json({ error: "Failed to initiate payment" })
        }
      } catch (parseError) {
        console.error("Error parsing payment response:", parseError, body)
        return res.status(500).json({ error: "Invalid response from payment gateway" })
      }
    })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.handleIPN = async (req, res) => {
  console.log("IPN received:", req.body)

  try {
    const { paymentID, reg, amount, status, transaction_id } = req.body

    // First try to find by val_id
    let attendee = await Attendee.findOne({ val_id: paymentID })

    // If not found by val_id, try to find by _id (reg)
    if (!attendee && reg) {
      attendee = await Attendee.findById(reg)
      // If found by _id, update the val_id
      if (attendee) {
        attendee.val_id = paymentID
      }
    }

    if (!attendee) {
      console.error(`❌ Attendee not found for payment ID: ${paymentID}, reg: ${reg}`)
      return res.status(404).json({ error: "Attendee not found" })
    }

    if (status === "SUCCESS" || status === "VALID" || status === "VALIDATED") {
      attendee.payment_status = true
      await attendee.save()
      console.log(`✅ Payment successful for ${attendee.name}, ID: ${attendee._id}, Transaction: ${transaction_id}`)
    } else {
      console.log(`❌ Payment failed for ${attendee.name}, Status: ${status}`)
    }

    res.status(200).json({ message: "IPN received" })
  } catch (error) {
    console.error("Error processing IPN:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.checkPaymentStatus = async (req, res) => {
  const attendeeId = req.params.id
  try {
    const attendee = await Attendee.findById(attendeeId)
    if (!attendee) return res.status(404).json({ error: "Attendee not found" })

    // For debugging
    // console.log(
    //   `Checking payment status for ${attendee.name}, ID: ${attendee._id}, Status: ${attendee.payment_status ? "Paid" : "Unpaid"}`,
    // )

    res.json({
      name: attendee.name,
      email: attendee.email,
      payment_status: attendee.payment_status ? "Paid" : "Unpaid",
    })
  } catch (error) {
    console.error("Error fetching payment status:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Add a manual payment update endpoint for testing or admin use
exports.updatePaymentStatus = async (req, res) => {
  const attendeeId = req.params.id
  try {
    const attendee = await Attendee.findById(attendeeId)
    if (!attendee) return res.status(404).json({ error: "Attendee not found" })

    attendee.payment_status = true
    await attendee.save()

    console.log(`✅ Payment manually marked as successful for ${attendee.name}`)

    res.json({
      success: true,
      message: `Payment status updated for ${attendee.name}`,
    })
  } catch (error) {
    console.error("Error updating payment status:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}


/**
 * Download a PDF payslip for the given attendee (and optionally a specific paper).
 * Example GET /payment/paySlip/:id?paperId=123
 */
exports.downloadPaySlip = async (req, res) => {
  try {
    const id = req.params.id;
    const { paperId } = req.query;  // if you want a single paper’s slip

    // 1) Find the attendee
    //    If you want to also populate papers, you can do .populate('papers') if references or just keep them as subdocs:
    const attendee = await Attendee.findById(id);
    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }

    // 2) For a “paper-level” slip, find the specific paper
    //    Or for a “whole attendee” slip, skip
    let paper = null;
    if (paperId) {
      paper = attendee.papers.find((p) => p.paperId === paperId || p._id.toString() === paperId);
      if (!paper) {
        return res.status(404).json({ error: "Paper not found for this attendee" });
      }
    }

    // 3) Create a PDF Document
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    // 4) Set response headers for download
    //    e.g. "payslip_<attendeeId>.pdf"
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="payslip_${id}${paperId ? "_" + paperId : ""}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");

    // Pipe PDF to response
    doc.pipe(res);

    // 5) Add some styling (fonts, lines, etc.)
    //    For example, a big heading:
    doc
      .fontSize(18)
      .text("ICERIE 2025 Conference - Payment Receipt", { align: "center" })
      .moveDown();

    // 6) Add Attendee Info
    doc
      .fontSize(12)
      .text(`Name: ${attendee.name}`)
      .text(`Email: ${attendee.email}`)
      .text(`University: ${attendee.university}`)
      .text(`Category: ${attendee.category}`)
      .moveDown();

    // If you have an overall transaction ID or val_id at the attendee level:
    if (attendee.val_id) {
      doc.text(`Attendee val_id: ${attendee.val_id}`);
    }
    doc.moveDown();

    // 7) If it’s a per-paper slip, show details for that paper
    if (paper) {
      doc
        .fontSize(14)
        .text("Paper Payment Details:", { underline: true })
        .moveDown(0.5);

      doc.fontSize(12).text(`Paper ID: ${paper.paperId}`);
      doc.text(`Track: ${paper.track}`);
      doc.text(`Proceedings Publication: ${paper.proceedingsPublication}`);
      doc.text(`Full Paper Publication: ${paper.fullPaperPublication}`);
      doc.text(`Presentation Type: ${paper.presentationType}`);
      doc.moveDown();

      doc.text(`Payment Status: ${paper.payment_status ? "Paid" : "Not Paid"}`);
      if (paper.transaction_id) {
        doc.text(`Transaction ID: ${paper.transaction_id}`);
      }
      if (paper.val_id) {
        doc.text(`Payment Reference (val_id): ${paper.val_id}`);
      }
      // If you have an amount for this paper specifically, print it
      // doc.text(`Amount Paid: ...`);

    } else {
      // 8) Otherwise, show a summary of all paid papers for the attendee
      doc
        .fontSize(14)
        .text("Papers Payment Summary:", { underline: true })
        .moveDown(0.5);

      attendee.papers.forEach((paper, i) => {
        doc.fontSize(12).text(`Paper ${i + 1}: `);
        doc.text(`   Paper ID: ${paper.paperId}`);
        doc.text(`   Track: ${paper.track}`);
        doc.text(`   Paid: ${paper.payment_status ? "Yes" : "No"}`);
        if (paper.transaction_id) {
          doc.text(`   Transaction ID: ${paper.transaction_id}`);
        }
        doc.moveDown(0.5);
      });
    }

    // 9) Add final note or signature
    doc.moveDown();
    doc.text(
      "Thank you for your payment. We look forward to your participation in the conference!",
      { italic: true }
    );

    // 10) Finalize the PDF
    doc.end();

    // The PDF will stream to the client as a download
  } catch (error) {
    console.error("Error generating payslip PDF:", error);
    res.status(500).json({ error: "Could not generate PDF" });
  }
};