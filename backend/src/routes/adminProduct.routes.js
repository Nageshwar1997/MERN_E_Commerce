const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const {
  createProductController,
  createMultipleProductsController,
  deleteProductController,
  updateProductController,
} = require("../controllers/product.controller");
const adminProductRouter = express.Router();

adminProductRouter.post("/create", authenticate, createProductController);
adminProductRouter.post(
  "/creates",
  authenticate,
  createMultipleProductsController
);
adminProductRouter.delete("/:id", authenticate, deleteProductController);
adminProductRouter.put("/:id", authenticate, updateProductController);

module.exports = adminProductRouter;
