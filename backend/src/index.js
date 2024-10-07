const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    error: false,
    message: "Welcome to E-Commerce Backend API",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use((_, res) => {
  res.status(404).json({
    success: false,
    error: true,
    message: "Page not found",
  });
});

module.exports = app;
