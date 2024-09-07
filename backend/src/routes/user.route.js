const express = require("express");
const {
  getUserProfile,
  getAllUsersProfiles,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/profile", getUserProfile);
userRouter.get("/", getAllUsersProfiles);

module.exports = userRouter;
