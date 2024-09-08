const express = require("express");
const authRouter = express.Router();

const {
  loginUserController,
  registerUserController,
} = require("../controllers/auth.controller");

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);

module.exports = authRouter;
