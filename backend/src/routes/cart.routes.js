const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const {
  getUserCartController,
  addProductToCartController,
} = require("../controllers/cart.controller");
const cartRouter = express.Router();

cartRouter.get("/", authenticateUser, getUserCartController);
cartRouter.get("/add", authenticateUser, addProductToCartController);

module.exports = cartRouter;
