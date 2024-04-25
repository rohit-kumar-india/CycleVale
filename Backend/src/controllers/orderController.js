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
        const orders = await Order.find({ userId }).populate('items.product');
        res.status(200).json(orders );
    } catch (error) {
        console.error('Error retrieving order history:', error);
        res.status(500).json({ error: 'Error retrieving order history' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId).populate('items.product');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ message: 'Error fetching order details' });
    }
  };
