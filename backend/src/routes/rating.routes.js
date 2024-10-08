const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const {
  createRatingController,
  getAllRatingsController,
} = require("../controllers/rating.controller");

const ratingRouter = express.Router();

ratingRouter.post(
  //   "/create/:productId", // OR
  "/create",
  authenticate,
  createRatingController
);
ratingRouter.put("/product/:productId", authenticate, getAllRatingsController);

module.exports = ratingRouter;
