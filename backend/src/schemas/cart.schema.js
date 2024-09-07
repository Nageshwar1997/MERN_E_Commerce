const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    ],
    quantity: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    totalDiscountedPrice: { type: Number, required: true, default: 0 },
    totalDiscount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = cartSchema;
