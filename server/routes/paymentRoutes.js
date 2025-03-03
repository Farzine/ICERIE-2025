const express = require("express")
const router = express.Router()
const paymentController = require("../controllers/paymentController")

router.get("/pay/:id", paymentController.initiatePayment)
router.post("/ipn", paymentController.handleIPN)
router.get("/status/:id", paymentController.checkPaymentStatus)
router.post("/update-status/:id", paymentController.updatePaymentStatus) // New endpoint for manual updates

module.exports = router

