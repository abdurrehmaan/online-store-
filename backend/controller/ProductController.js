//models
const Product = require("../models/Product");

//token
const generateToken = require("../tokenGenerate");

//user prodcuts
const AllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

//specific products
const SpecificProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};
const AddProduct = async (req, res) => {
  const { name, image, description, rating, numReview, countInStock, price } =
    req.body;

  const product = new Product({ name, image, description, rating, numReview, countInStock, price });
  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
  
};

module.exports = {
  AllProducts,
  SpecificProduct,
  AddProduct,
};
