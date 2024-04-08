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
        const products = await Product.find();
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
      res.status(500).json({ message: 'Internal server error.' });
    }
};



