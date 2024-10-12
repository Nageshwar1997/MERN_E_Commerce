const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const adminProductRouter = require("./routes/adminProduct.routes");
const cartRouter = require("./routes/cart.routes");
const cartItemRouter = require("./routes/cartItem.routes");
const orderRouter = require("./routes/order.routes");
const reviewRouter = require("./routes/review.routes");
const ratingRouter = require("./routes/rating.routes");
const adminOrderRouter = require("./routes/adminOrder.routes");
const paymentRouter = require("./routes/payment.routes");

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

app.use("/api/products", productRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_items", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/payments", paymentRouter)

app.use((_, res) => {
  res.status(404).json({
    success: false,
    error: true,
    message: "Page not found",
  });
});

module.exports = app;

