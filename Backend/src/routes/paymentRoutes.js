const router = require('express').Router();
const { processPayment } = require('../controllers/paymentController');

// POST endpoint for uploading an image
router.post('/', processPayment);

module.exports = router;
