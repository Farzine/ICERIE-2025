const Attendee = require("../models/attendee");
const axios = require("axios");
const feeData = [
  {
    category: "Local Delegates (Author)",
    early_bird_fee: 6000,
    regular_fee: 7000,
    currency: "BDT",
  },
  {
    category: "Local Delegates (Participant)",
    early_bird_fee: 5000,
    regular_fee: 6000,
    currency: "BDT",
  },
  {
    category: "Local Students (Author/ Co-author)",
    early_bird_fee: 4000,
    regular_fee: 5000,
    currency: "BDT",
  },
  {
    category: "Foreign Delegates",
    early_bird_fee: 350,
    regular_fee: 450,
    currency: "USD",
  },
  {
    category: "Foreign Students",
    early_bird_fee: 200,
    regular_fee: 250,
    currency: "USD",
  },
];

const RegisterAttendee = async (req, res) => {
  const attendee = req.body;
  const selectedFee = feeData.find((fee) => fee.category === attendee.category);
  attendee.regular_fee = selectedFee.regular_fee;
  attendee.early_bird_fee = selectedFee.early_bird_fee;
  attendee.currency = selectedFee.currency;

  const newAttendee = new Attendee(attendee);
  try {
    await newAttendee.save();
    res.status(201).json(newAttendee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getAllAttendee = async (req, res) => {
  try {
    const attendees = await Attendee.find().select(
      "_id name email university photoUrl category payment_status phone"
    );
    res.status(200).json(attendees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAttendeeByID = async (req, res) => {
  const { id } = req.params;
  try {
    const attendee = await Attendee.findById(id);
    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }
    try {
      const paymentValidationUrl = `https://epayment.sust.edu/api/payment/status/${attendee.val_id}`
      console.log("Payment validation URL: ",paymentValidationUrl);
      const payment = await axios.post(paymentValidationUrl);
      console.log("Payment response status: ",payment.data.status);
      if(payment.data.status == "200"){
        console.log("Paid successfully 💸💸");
        attendee.payment_status = true;
      }
    } catch (error) {
      console.log(error);
    }
    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { RegisterAttendee, getAllAttendee, getAttendeeByID };
