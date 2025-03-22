

const mongoose = require("mongoose");

// Each paper requires its own payment_status
const paperSchema = new mongoose.Schema({
  paperId: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
    enum: [
      "Architecture, Civil and Environmental Engineering",
      "Chemical, Petroleum and Food Process Engineering",
      "Electrical, Information and Communication Engineering",
      "Mechanical, Industrial and Sustainable Engineering",
    ],
  },
  proceedingsPublication: {
    type: String,
    enum: ["I will publish", "I will not publish"],
    required: true,
  },
  fullPaperPublication: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  presentationType: {
    type: String,
    enum: ["poster", "oral"],
    required: true,
  },
  presentationMood: {
    type: String,
    enum: ["physical", "online"],
    default: "physical",
    required: true,
  },
  payment_status: {
    type: Boolean,
    default: false,
  },
  additionalPage: {
    type: Number,
    default: 0,
    required: true,
  },
  payment_date: {
    type: Date,
  },
  val_id: {
    type: String,
  },
  payment_history: {
    type: [{
      val_id: String,
      amount: Number,
      date: Date
    }],
    default: []
  }
}, { _id: false });

const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  regular_fee: {
    type: Number,
    required: true,
  },
  early_bird_fee: {
    type: Number,
    required: true,
  },
  // Overall payment_status for the attendee if needed
  payment_status: {
    type: Boolean,
    default: false,
  },
  // If user only needs to choose these options once
  visaSupport: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  tourInterested: {
    type: Boolean,
    default: false,
    required: true,
  },
  // Each paper has its own payment status
  papers: [paperSchema],

  // We can still keep this if you want to store a single val_id at the top level
  val_id: {
    type: String,
  },
});

const Attendee = mongoose.model("Attendee", attendeeSchema);
module.exports = Attendee;
