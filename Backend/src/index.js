const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./src/routes/orderRoutes');
// const errorHandler = require('./src/middleware/errorMiddleware');
require('./middleware/mongoose');

dotenv.config();
const app = express();
// Middleware
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(express.json()); // for parsing application/json

// Routes
//app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
//app.use('/api/orders', orderRoutes);

// Error handler middleware
//app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
