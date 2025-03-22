const request = require("request");
const Attendee = require("../models/attendee");
const axios = require("axios");
const dotenv = require("dotenv");
const earlyBirdDeadline = new Date("2025-03-25T23:59:59Z");
const regularDeadline = new Date("2025-04-10T23:59:59Z");

dotenv.config();

exports.initiatePayment = async (req, res) => {
  const { attendeeId, paperId } = req.params;

  try {
    // 1) Find the attendee
    const attendee = await Attendee.findById(attendeeId);
    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }

    // 2) Find the specific paper
    const paper = attendee.papers.find((p) => p.paperId === paperId);
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
    let baseFee;

    if (currentDate <= earlyBirdDeadline) {
      baseFee = attendee.early_bird_fee;
    } else if (currentDate <= regularDeadline) {
      baseFee = attendee.regular_fee;
    } else {
      return res.status(400).json({ error: "Payment deadline has passed" });
    }

    // ✅ Add extra charge for additional pages for this paper
    const additionalPageFee = paper.additionalPage ? paper.additionalPage * 1000 : 0;
    const amount = baseFee + additionalPageFee;

    console.log(`Payment Amount for Paper ${paperId}: ${amount} BDT`);


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
      console.log("Options in initiate payment:", options);

      try {
        const responseData = JSON.parse(body);
        console.log("Payment gateway response:", responseData);
        // Store payment initiation in payment history
        if (responseData.data.paymentID) {
          // Create payment history entry
          const paymentEntry = {
            val_id: responseData.data.paymentID,
            amount: amount,
            date: new Date(),
          };
          
          // Initialize payment_history array if it doesn't exist
          if (!paper.payment_history) {
            paper.payment_history = [];
          }
          
          // Add the new payment entry to history
          paper.payment_history.push(paymentEntry);
          console.log(`Added payment to history: ${JSON.stringify(paymentEntry)}`);
        }

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
      console.log("Paper found at hanldePIN:", paper);
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

  try {
    const attendee = await Attendee.findById(attendeeId);
    if (!attendee) return res.status(404).json({ error: "Attendee not found" });

    const paper = attendee.papers.find((p) => p.paperId === paperId);
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
        console.log("Payment validation response:", paymentResponse.data);
        // Suppose "200" indicates a valid/confirmed payment
        if (paymentResponse.data.status === "200") {
          console.log(`Paper ${paper.paperId} paid successfully 💸`);
          paper.payment_status = true;
          // Optionally update paper.transaction_id if the gateway returns it
          paper.payment_date = Date.now();
            
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

