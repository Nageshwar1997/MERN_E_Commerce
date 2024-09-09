const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const { createRatingController, getProductAllRatingsController } = require("../controllers/rating.controller");

const ratingRouter = express.Router();

ratingRouter.post(
//   "/create/:productId", // OR
  "/create",
  authenticateUser,
  createRatingController
);
ratingRouter.get(
  "/:productId",
  authenticateUser,
  getProductAllRatingsController
);


module.exports = ratingRouter;
