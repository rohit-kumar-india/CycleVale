const router = require('express').Router();
const productController = require('../controllers/productController');

// get product by Id
router.get('/:id', productController.getProductbyId);

// get all products
router.get('/', productController.getAllProduct);

//Update products
router.patch('/:id', productController.updateProduct);

//Update products
router.delete('/:id', productController.deleteProduct);


// Add products
router.post('/', productController.addProduct);


module.exports = router;