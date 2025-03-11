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
    early_bird_fee: 43750, // 350 USD
    regular_fee: 56250, // 450 USD
    currency: "BDT",
  },
  {
    category: "Foreign Students",
    early_bird_fee: 25000, // 200 USD
    regular_fee: 31250, // 250 USD
    currency: "BDT",
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
      "_id name email university photoUrl category phone"
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
    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { RegisterAttendee, getAllAttendee, getAttendeeByID };
