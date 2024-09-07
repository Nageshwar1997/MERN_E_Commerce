const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema(
  {
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 },
    discountedPrice: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = cartProductSchema;
