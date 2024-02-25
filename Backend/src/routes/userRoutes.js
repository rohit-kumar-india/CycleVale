const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {getUserbyId, getAllUser, updateUser, deleteUser, login, signup} = require('../controllers/userController');

// get user by Id
router.get('/:id', getUserbyId);

// get all users
router.get('/', getAllUser);

//Update users
router.patch('/:id', updateUser);

//Update users
router.delete('/:id', deleteUser);

// Login route
router.post('/login', login);

// Add users
router.post('/signup', signup);


module.exports = router;