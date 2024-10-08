const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const {
  getAllProductsController,
  findProductByIdController,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/", authenticate, getAllProductsController);
productRouter.get("/id/:id", authenticate, findProductByIdController);

module.exports = productRouter;
