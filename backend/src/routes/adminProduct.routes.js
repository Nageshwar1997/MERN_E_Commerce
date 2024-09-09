const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const adminAuthorization = require("../middlewares/authorization");
const {
  createProductController,
  createMultipleProductsController,
  deleteProductController,
  updateProductController,
} = require("../controllers/product.controller");
const adminProductRouter = express.Router();

adminProductRouter.post(
  "/create",
  [adminAuthorization, authenticateUser],
  createProductController
);
adminProductRouter.post(
  "/create_multiple",
  [adminAuthorization, authenticateUser],
  createMultipleProductsController
);
adminProductRouter.delete(
  "/delete/:id",
  [adminAuthorization, authenticateUser],
  deleteProductController
);
adminProductRouter.put(
  "/update/:id",
  [adminAuthorization, authenticateUser],
  updateProductController
);

module.exports = adminProductRouter;
