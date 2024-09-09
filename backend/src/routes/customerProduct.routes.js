const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const {
  getAllProductsController,
  findProductByIdController,
} = require("../controllers/product.controller");
const customerProductRouter = express.Router();

customerProductRouter.get("/", authenticateUser, getAllProductsController);
customerProductRouter.get(
  "/id/:id",
  authenticateUser,
  findProductByIdController
);

module.exports = customerProductRouter;
