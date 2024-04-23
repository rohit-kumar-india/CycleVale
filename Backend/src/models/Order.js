const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    }
}, { _id: false });

const shippingDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, match: [/^\d{10}$/, 'Please fill a valid mobile number'] },
    address: { type: String, required: true },
    landmark: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, },
    zipCode: { type: String, required: true }
}, { _id: false });

const paymentDetailsSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [productSchema],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingDetails: {
        type: shippingDetailsSchema,
        required: true
    },
    paymentDetails: {
        type: paymentDetailsSchema,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
