// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Pay for a specific paper
router.post("/:attendeeId/paper/:paperId", paymentController.initiatePayment);

// IPN, status checks, etc., remain
router.post("/ipn", paymentController.handleIPN);
router.get("/status/:attendeeId/paper/:paperId", paymentController.checkPaymentStatus);
router.post("/update-status/:id", paymentController.updatePaymentStatus);

module.exports = router;

