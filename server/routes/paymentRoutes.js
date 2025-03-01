const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/pay/:id', paymentController.initiatePayment);
router.post('/ipn', paymentController.handleIPN);
router.get('/status/:id', paymentController.checkPaymentStatus);

module.exports = router;
