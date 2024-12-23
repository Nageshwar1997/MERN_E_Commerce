require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.status(200).send("Welcome to E-commerce App Backend");
});

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

const userRouter = require("./routes/user.routes");
app.use("/api/users", userRouter);

module.exports = app;
