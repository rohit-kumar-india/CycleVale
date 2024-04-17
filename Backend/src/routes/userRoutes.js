const router = require('express').Router();
const userController = require('../controllers/userController');

// get user by Id
router.get('/:id', userController.getUserbyId);

// get all users
router.get('/', userController.getAllUser);

//Update users
router.patch('/:id', userController.updateUser);

//Update users
router.delete('/:id', userController.deleteUser);

// Login route
router.post('/login', userController.login);

// Add users
router.post('/signup', userController.signup);

//Get wishlist by UserId
router.get('/:userId/wishlists',userController.getwishlistbyUserId);

// Add Wishlist
router.post('/Wishlist', userController.createWishlist);

// Add Item to Wishlist
router.post('/wishlist/item', userController.addWishlistItem);

// Delete Item to Wishlist
//router.delete('/:userId/wishlists/:wishlistId/items', userController.removeWishlistItem1);
router.delete('/wishlist/item', userController.removeWishlistItem);

// Add payment
router.post('/:userId/paymentDetails', userController.addPaymentDetails);

// Get payment
router.get('/:userId/paymentDetails', userController.getPaymentDetails);



module.exports = router;