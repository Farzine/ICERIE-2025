const request = require('request');
const Attendee = require('../models/attendee');
const dotenv = require('dotenv');

dotenv.config();

exports.initiatePayment = async (req, res) => {
    const attendeeId = req.params.id;
    try {
        const attendee = await Attendee.findById(attendeeId);
        if (!attendee) return res.status(404).json({ error: "Attendee not found" });

        const currentDate = new Date();
        const earlyBirdDeadline = new Date("2025-04-10T23:59:59Z");
        const amount = attendee.payment_status ? 0 : 
                       (currentDate <= earlyBirdDeadline ? attendee.early_bird_fee : attendee.regular_fee);

        if (amount === 0) {
            return res.status(400).json({ error: "No payment required" });
        }

        const options = {
            method: 'POST',
            url: 'https://epayment.sust.edu/api/payment/create/icerie',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                'User-Agent': 'insomnia/10.3.0',
                Authorization: `Bearer ${process.env.PAYMENT_API_KEY}` // Use an environment variable for security
            },
            formData: {
                name: attendee.name,
                reg: attendeeId,
                amount: amount,
                email: attendee.email,
                mobile: attendee.phone,
                ipn_url: `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/payment/ipn`,
                redirect_url: `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/payment-success`
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error("Payment initiation error:", error);
                return res.status(500).json({ error: "Payment initiation failed" });
            }

            try {
                const responseData = JSON.parse(body);
                if (responseData.status === "success" && responseData.data.redirectURL) {
                    return res.json({ url: responseData.data.redirectURL });
                } else {
                    return res.status(400).json({ error: "Failed to initiate payment" });
                }
            } catch (parseError) {
                console.error("Error parsing payment response:", parseError);
                return res.status(500).json({ error: "Invalid response from payment gateway" });
            }
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.handleIPN = async (req, res) => {
    try {
        const { paymentID, amount, status } = req.body;

        const attendee = await Attendee.findOne({ val_id: paymentID });
        if (!attendee) return res.status(404).json({ error: "Attendee not found" });

        if (status === "SUCCESS") {
            attendee.payment_status = true;
            await attendee.save();
            console.log(`✅ Payment successful for ${attendee.name}`);
        } else {
            console.log(`❌ Payment failed for ${attendee.name}`);
        }

        res.status(200).json({ message: "IPN received" });

    } catch (error) {
        console.error("Error processing IPN:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.checkPaymentStatus = async (req, res) => {
    const attendeeId = req.params.id;
    try {
        const attendee = await Attendee.findById(attendeeId);
        if (!attendee) return res.status(404).json({ error: "Attendee not found" });

        res.json({
            name: attendee.name,
            email: attendee.email,
            payment_status: attendee.payment_status ? "Paid" : "Unpaid"
        });

    } catch (error) {
        console.error("Error fetching payment status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
