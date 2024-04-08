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


module.exports = router;