const express = require("express");
const asyncHandler = require("express-async-handler");

//middleware 
const VerifyToken = require("../middleware/Auth");

const ordersRouter = express.Router();


//controllers
const { OrderItems, specificOrder, paymentResult } = require("../controller/OrderController");


ordersRouter.post("/", VerifyToken, asyncHandler(OrderItems));
ordersRouter.post("/:id", VerifyToken, asyncHandler(specificOrder));
ordersRouter.get("/:id/pay", VerifyToken, asyncHandler(paymentResult))
module.exports = ordersRouter;