const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const {
  createOrderController,
  findOrderbyIdController,
  orderHistoryController,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/", authenticate, createOrderController);
orderRouter.get("/user", authenticate, orderHistoryController);
orderRouter.get("/:id", authenticate, findOrderbyIdController);

module.exports = orderRouter;
