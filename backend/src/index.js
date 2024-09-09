require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const cartRouter = require("./routes/cart.routes");
const cartProductRouter = require("./routes/cartProduct.routes");
const adminOrderRouter = require("./routes/adminOrder.routes");
const adminProductRouter = require("./routes/adminProduct.routes");
const customerProductRouter = require("./routes/customerProduct.routes");
const reviewRouter = require("./routes/review.routes");
const ratingRouter = require("./routes/rating.routes");
const customerOrderRouter = require("./routes/customerOrder.routes");

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
app.use("/api/admin/order", adminOrderRouter);
app.use("/api/user/order", customerOrderRouter);
app.use("/api/admin/product", adminProductRouter);
app.use("/api/user/product", customerProductRouter);
app.use("/api/user/cart", cartRouter);
app.use("/api/user/cart", cartProductRouter);
app.use("/api/user/product/review", reviewRouter);
app.use("/api/user/product/rating", ratingRouter);

module.exports = app;

