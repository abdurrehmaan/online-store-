const express = require("express");
const asyncHandler = require("express-async-handler");

const productRouter = express.Router();

//controllers
const {
  AllProducts,
  SpecificProduct,
  AddProduct
} = require("../controller/ProductController");

productRouter.get("/", asyncHandler(AllProducts));
productRouter.get("/:id", asyncHandler(SpecificProduct));
productRouter.post("/add-product", asyncHandler(AddProduct));

module.exports = productRouter;
