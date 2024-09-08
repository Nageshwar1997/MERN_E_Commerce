const express = require("express");
const {
  getUserProfileController,
  getAllUsersProfilesController,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/profile", getUserProfileController);
userRouter.get("/", getAllUsersProfilesController);

module.exports = userRouter;
