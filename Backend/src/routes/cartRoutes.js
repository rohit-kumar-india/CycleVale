const router = require('express').Router();
const cartController = require('../controllers/cartController');

// get cart by Id
router.get('/:id', cartController.getCartbyUserId);

// get all carts
router.get('/', cartController.getAllCart);

//Update carts
router.patch('/:userId/:productId', cartController.updateQuantity);

//Update carts
router.delete('/:userId/:productId', cartController.deleteItembyUserId);


// Add carts
router.post('/', cartController.addItem);


module.exports = router;