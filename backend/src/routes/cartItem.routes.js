const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const { updateCartItemController, removeCartItemController } = require("../controllers/cartItem.controller");

const cartItemRouter = express.Router();

cartItemRouter.put("/:id", authenticate, updateCartItemController);
cartItemRouter.delete("/:id", authenticate, removeCartItemController);

module.exports = cartItemRouter;
