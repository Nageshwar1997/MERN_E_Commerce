const mongoose = require("mongoose");

const orderProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryDate: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = orderProductSchema;
