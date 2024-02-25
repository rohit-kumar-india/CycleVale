const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.getUserbyId = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({user});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.getAllUser = async (req, res, next) => {
    try{
        const users = await User.find();
        if(!users)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({users});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.updateUser = async (req, res, next) => {
    try{
        const users = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!users)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({users});
    }catch(err){
        res.status(500).send(err.message)
    }
};


exports.deleteUser = async (req, res, next) => {
    try{
        const users = await User.findByIdAndDelete(req.params.id);
        if(!users)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({users});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }

      // Check for user
      const user = await User.findOne({ email });
      
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      
      // Create token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
      
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error. ',error });
    }
  };

exports.signup = async (req, res, next) => {
    try {
      // Create user
      const user = new User(req.body);
      
      // Validate input
      if (!user.email || !user.password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }
  
      // Check for existing user
      const existingUser = await User.findOne({email: user.email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      // Save to DB
      await user.save();
  
      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
};



