require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    error: false,
    message: "Welcome to Backend",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

module.exports = app;
