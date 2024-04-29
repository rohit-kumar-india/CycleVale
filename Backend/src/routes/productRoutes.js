const router = require('express').Router();
const productController = require('../controllers/productController');

// get product by Id
router.get('/:id', productController.getProductbyId);

// get all products
router.get('/', productController.getAllProduct);

//Update products
router.patch('/:id', productController.updateProduct);

//Delete products
router.delete('/:id', productController.deleteProduct);

// Add products
router.post('/', productController.addProduct);

// Route to add a review for a product
router.post('/:productId/reviews', productController.addReview);


module.exports = router;