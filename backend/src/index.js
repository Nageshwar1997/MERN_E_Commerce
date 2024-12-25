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

const productRouter = require("./routes/product.routes");
app.use("/api/products", productRouter);

const adminProductRouter = require("./routes/adminProduct.routes");
app.use("/api/admin/products", adminProductRouter);

const adminOrderRouter = require("./routes/adminOrder.routes");
app.use("/api/admin/orders", adminOrderRouter);

const cartRouter = require("./routes/cart.routes");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.routes");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.routes");
app.use("/api/orders", orderRouter);

const reviewRouter = require("./routes/review.routes");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating.routes");
app.use("/api/ratings", ratingRouter);

const paymentRouter = require("./routes/payment.routes");
app.use("/api/payments", paymentRouter);

module.exports = app;
