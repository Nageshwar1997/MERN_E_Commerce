const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const {
  createOrderController,
  orderHistoryController,
  findOrderbyIdController,
} = require("../controllers/order.controller");
const customerOrderRouter = express.Router();

customerOrderRouter.post("/create", authenticateUser, createOrderController);
customerOrderRouter.get("/order/:id", authenticateUser, findOrderbyIdController);
customerOrderRouter.get("/order/history", authenticateUser, orderHistoryController);

module.exports = customerOrderRouter;
