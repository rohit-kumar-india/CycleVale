const router = require('express').Router();
const wishlistController = require('../controllers/wishlistController');

// Add Wishlist
router.post('/Wishlist', wishlistController.createWishlist);

//Get wishlist by UserId
router.get('/:userId/wishlists',wishlistController.getwishlistbyUserId);

// Add Item to Wishlist
router.post('/wishlist/item', wishlistController.addWishlistItem);

// Delete Item to Wishlist
router.delete('/wishlist/item', wishlistController.removeWishlistItem);


module.exports = router;