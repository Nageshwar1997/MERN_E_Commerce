const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const {
  updateCartProductController,
  removeCartProductController,
} = require("../controllers/cartProduct.controller");
const cartProductRouter = express.Router();

cartProductRouter.put("/:id", authenticateUser, updateCartProductController);
cartProductRouter.delete("/:id", authenticateUser, removeCartProductController);

module.exports = cartProductRouter;
