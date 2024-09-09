const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const { createReviewController, getAllReviewsController } = require("../controllers/review.controller");

const reviewRouter = express.Router();

reviewRouter.post("/create", authenticateUser, createReviewController);
reviewRouter.post("/:productId", authenticateUser, getAllReviewsController);

module.exports = reviewRouter