const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    sizes: [{ name: String, quantity: Number }],
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    ratingsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = productSchema;
