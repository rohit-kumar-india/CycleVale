const Product = require("../models/Product");
//const jwt = require('jsonwebtoken');

exports.getProductbyId = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product)
            return res.status(404).send({ message: "No Products Found."});
        res.status(200).send({product});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.getAllProduct = async (req, res, next) => {
    try{
        const { limit, page } = req.query;
        const limitValue = parseInt(limit, 10) || 10;
        const pageValue = parseInt(page, 10) || 1;
        const skip = (pageValue - 1) * limitValue;
        const products = await Product.find().skip(skip).limit(limitValue);
        if(!products)
            return res.status(404).send({ message: "No Products Found."});
        res.status(200).send({products});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.updateProduct = async (req, res, next) => {
    try{
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!products)
            return res.status(404).send({ message: "No Products Found."});
        res.status(200).send({products});
    }catch(err){
        res.status(500).send(err.message)
    }
};


exports.deleteProduct = async (req, res, next) => {
    try{
        const products = await Product.findByIdAndDelete(req.params.id);
        if(!products)
            return res.status(404).send({ message: "No Products Found."});
        res.status(200).send({products});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.addProduct = async (req, res, next) => {
    try {
      // Create Product
      const product = new Product(req.body);
      
      // Validate input
    //   if (!Product.name || !Product.password) {
    //     return res.status(400).json({ message: 'Productname and password are required.' });
    //   }
  
      // Check for existing Product
    //   const existingProduct = await Product.findOne({email: Product.email });
    //   if (existingProduct) {
    //     return res.status(400).json({ message: 'Product already exists.' });
    //   }

      // Save to DB
      await product.save();
  
      res.status(201).json({ message: 'Product added successfully.' });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Internal server error.',error });
    }
};

// Route to add a review for a product
exports.addReview = async (req, res) => {
    const { user, name, rating, comment } = req.body;
    const productId = req.params.productId;
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Create a new review
      const review = {
        name,
        rating,
        comment,
        user
        //user: req.user._id // Assuming you have authentication middleware that adds user info to req.user
      };
  
      // Add the review to the product's reviews array
      product.reviews.push(review);
  
      // Update the product's rating and numReviews based on the new review
      product.rating = (product.rating * product.numReviews + rating) / (product.numReviews + 1);
      product.numReviews += 1;
  
      // Save the updated product
      await product.save();
  
      res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

