const request = require("request")
const Attendee = require("../models/attendee")
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

