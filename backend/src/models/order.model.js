const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  orderItems: [
    { type: Schema.Types.ObjectId, ref: "orderItems", required: true },
  ],
  orderDate: { type: Date, required: true, default: Date.now },
  deliveryDate: Date,
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "addresses",
  },
  paymentDetails: {
    paymentMethod: String,
    transactionId: String,
    paymentId: String,
    paymentStatus: { type: String, default: "PENDING" },
  },
  totalPrice: { type: Number, required: true },
  totalDiscountedPrice: { type: Number, required: true },
  discounte: { type: Number, required: true },
  orderStatus: { type: String, required: true, default: "PENDING" },
  totalItem: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = model("orders", orderSchema);

module.exports = Order;
