const Order = require('../models/Order');

// Controller function to place a new order
exports.placeOrder = async (req, res) => {
    try {
        // Logic to create a new order and save it to the database
        const newOrder = new Order({ ...req.body });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Error placing order' });
    }
};

// Controller function to retrieve order history for a user
exports.getOrderHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Find all orders for the given user ID
        const orders = await Order.find({ userId }).populate('items.productId');
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error retrieving order history:', error);
        res.status(500).json({ error: 'Error retrieving order history' });
    }
};
