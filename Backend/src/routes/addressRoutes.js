const router = require('express').Router();
const addressController = require('../controllers/addressController');

// Add Address
router.post('/', addressController.addAddress);

router.put('/:addressId', addressController.updateAddress);

// Get Address by userId
router.get('/:userId', addressController.getAddresssesbyUserId);

// Delete Address
router.delete('/delete', addressController.deleteAddress);

module.exports = router;