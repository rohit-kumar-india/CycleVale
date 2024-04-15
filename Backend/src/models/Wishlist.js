const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      unique: true,
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  }, { _id: false });
  
  const wishlistSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: [wishlistItemSchema],
  });