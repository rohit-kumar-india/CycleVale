const router = require('express').Router();
const wishlistController = require('../controllers/wishlistController');

// Add Wishlist
router.post('/', wishlistController.createWishlist);

//Get wishlist by UserId
router.get('/:userId/wishlists',wishlistController.getwishlistbyUserId);

// Add Item to Wishlist
router.post('/item', wishlistController.addWishlistItem);

// Delete Item to Wishlist
router.delete('/item', wishlistController.removeWishlistItem);


module.exports = router;