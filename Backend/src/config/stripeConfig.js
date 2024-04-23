require('dotenv').config();

const stripeConfig = {
    Publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    Secret_key: process.env.STRIPE_SECRET_KEY,
  // Add other configurations here as needed
};

module.exports = stripeConfig;
