const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderProduct",
      },
    ],
    orderDate: { type: Date, required: true, default: Date.now },
    deliveryDate: Date,
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentDetails: {
      paymentMethod: String,
      transactionId: String,
      paymentId: String,
      paymentStatus: {
        type: String,
        default: "PENDING",
      },
    },
    totalPrice: { type: Number, required: true },
    totalDiscountedPrice: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    orderStatus: {
      type: String,
      required: true,
      default: "PENDING",
    },
    totalProducts: { type: Number, required: true },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = orderSchema;
