const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require('../models/Product');

exports.getCartbyUserId = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.params.id });
        if (!cart)
            return res.status(404).send({ message: "No Carts Found." });
        res.status(200).send({ cart });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getAllCart = async (req, res, next) => {
    try {
        const carts = await Cart.find();
        if (!carts)
            return res.status(404).send({ message: "No Carts Found." });
        res.status(200).send({ carts });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateQuantity = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart)
            return res.status(404).send({ message: "Cart not Found." });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        await cart.save();
        res.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Failed to update cart", error: error.message });
    }
};


exports.deleteItembyUserId = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;

        //const carts = await Cart.findByIdAndDelete(req.params.id);
        const cart = await Cart.findOne({ user: userId });

        if (!cart)
            return res.status(404).send({ message: "Cart not Found." });

        // Remove the item from the cart
        // Assuming your items are stored in an array named 'items' and each item has a 'product' field
        const updatedItems = cart.items.filter(item => item.product.toString() !== productId);

        // Save the updated cart
        cart.items = updatedItems;
        await cart.save();
        res.status(200).send({ message: 'Item removed from cart', cart });
    } catch (err) {
        res.status(500).send({ message: 'Failed to remove item from cart', error: err.message });
    }
};

// POST /api/cart
// Adds an item to the user's cart
exports.addItem = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Fetch the current price of the product from the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const price = product.price;

        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            // Check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                // Update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item
                cart.items.push({ product: productId, quantity, price });
            }
            await cart.save();
        }
        else {
            // Create new cart for user
            await Cart.create({
                user: userId,
                items: [{ product: productId, quantity, price }],
            });
        }

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Error updating cart' });
    }
};



