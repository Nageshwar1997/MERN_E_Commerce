const express = require("express");

const authenticate = require("../middlewares/authenticate.middleware");
const { findUserCartController, addItemToCartController } = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.get("/", authenticate, findUserCartController);
cartRouter.put("/add", authenticate, addItemToCartController);

module.exports = cartRouter;
