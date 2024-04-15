const User = require("../models/User");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.getUserbyId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send({ message: "No users Found." });
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send(err.message)
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users)
      return res.status(404).send({ message: "No users Found." });
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send(err.message)
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!users)
      return res.status(404).send({ message: "No users Found." });
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send(err.message)
  }
};


exports.deleteUser = async (req, res, next) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    if (!users)
      return res.status(404).send({ message: "No users Found." });
    res.status(200).send({ users });
  } catch (err) {
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
    res.status(500).json({ message: 'Internal server error. ', error });
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
    const existingUser = await User.findOne({ email: user.email });
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

exports.getwishlistbyUserId = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Assuming the wishlists are stored directly in the user document
    res.status(200).json(user.wishlists);

} catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
}
};

exports.createWishlist = async (req, res) => {
  const { userId, wishlistName } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let wishlist = user.wishlists.find(wl => wl.name === wishlistName);

    if (wishlist) {
      return res.status(400).send("Wishlist already exists");
    }

    wishlist = { name: wishlistName, items: [] };
    user.wishlists.push(wishlist);
    const updatedUser = await user.save();

    res.status(201).send({message:'Wishlist created successfully',wishlists: updatedUser.wishlists});
  } catch (error) {
    console.error('Failed to create wishlist:', error);
    res.status(500).send('Error creating wishlist');
  }
}

exports.addWishlistItem = async (req, res) => {
  const { userId, wishlistId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    let wishlist = user.wishlists.find(wl => wl.id === wishlistId);
    if (!wishlist) {
      return res.status(404).send("Wishlist does not exists");
    }

    let item = wishlist.items.find(item => item.product.toString() === productId);

    if (item) {
      return res.status(400).send("Item already present in Wishlist");
    }
    // Add the product to the wishlist
    wishlist.items.push({ product: productId });
    await user.save();

    res.status(201).send('Product added to wishlist');
  } catch (error) {
    console.error('Failed to add product to wishlist:', error);
    res.status(500).send('Error adding product to wishlist');
  }
};

exports.removeWishlistItem = async (req, res) => {
  const { userId, wishlistId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    let wishlist = user.wishlists.id(wishlistId);
    if (!wishlist) {
      return res.status(404).send("Wishlist does not exists");
    }

    let updateditems = wishlist.items.find(item => item.product.toString() !== productId);

    wishlist.items = updateditems ? updateditems : [];

    await user.save();

    res.status(200).send({message:'Product removed from wishlist'});

  } catch (error) {
    console.error('Failed to delete product from wishlist:', error);
    res.status(500).send('Error deleting product from wishlist');
  }
}


