const router = require('express').Router();
const orderController = require('../controllers/orderController');

// Route for placing a new order
router.post('/place-order', orderController.placeOrder);

// Route for retrieving order history
router.get('/order-history/:userId', orderController.getOrderHistory);

router.get('/:orderId', orderController.getOrderById);

module.exports = router;
