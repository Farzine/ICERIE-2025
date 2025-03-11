// const express = require("express")
// const router = express.Router()
// const paymentController = require("../controllers/paymentController")

// router.get("/pay/:id", paymentController.initiatePayment)
// router.post("/ipn", paymentController.handleIPN)
// router.get("/status/:id", paymentController.checkPaymentStatus)
// router.post("/update-status/:id", paymentController.updatePaymentStatus) // New endpoint for manual updates
// router.get("/paySlip/:id", paymentController.downloadPaySlip);

// module.exports = router


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
router.get("/paySlip/:attendeeId/paper/:paperId", paymentController.downloadPaySlip);

module.exports = router;

