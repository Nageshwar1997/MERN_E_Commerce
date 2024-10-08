const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const {
  createReviewController,
  getAllReviewsController,
} = require("../controllers/review.controller");

const reviewRouter = express.Router();

reviewRouter.post("/create", authenticate, createReviewController);
reviewRouter.get("/product/:productId", authenticate, getAllReviewsController);

module.exports = reviewRouter;
