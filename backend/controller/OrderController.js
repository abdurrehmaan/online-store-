//models
const Order = require("../models/Order");

//order items
const OrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    totalPrice,
    price,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

//payment result
const paymentResult = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: "paymentId" + Math.random(),
      status: "done",
      updated_time: Date.now(),
    };
    const updatedOrder = await order.save();
    res.json({ updatedOrder, message: "Order Completed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

//specific order
const specificOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

module.exports = {
  OrderItems,
  specificOrder,
  paymentResult,
};
