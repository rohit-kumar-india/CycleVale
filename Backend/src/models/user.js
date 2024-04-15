const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const wishlistSchema = require('./Wishlist');

// Address subdocument schema
const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, match: [/^\d{10}$/, 'Please fill a valid mobile number'] },
  address: { type: String, required: true },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true, match: [/^\d{6}$/, 'Please fill a valid pincode'] }
}, { _id: true, timestamps: true });

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    unique: true,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
}, { _id: false });

// const wishlistItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     unique: true,
//     required: true,
//   },
//   addedAt: {
//     type: Date,
//     default: Date.now,
//   },
// }, { _id: false });

// const wishlistSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   items: [wishlistItemSchema],
// });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  phoneNo: {
    type: String
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  addresses: [addressSchema],
  cart: [cartSchema],
  wishlists: [wishlistSchema],
}, { timestamps: true });

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check the password on signin
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};



module.exports = mongoose.model('User', userSchema);