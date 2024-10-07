const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discountPercent: { type: Number, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    sizes: [
      {
        name: {
          type: String,
          required: true,
          enum: [
            "S",
            "M",
            "L",
            "XL",
            "XXL",
            "XXXL",
            "s",
            "m",
            "l",
            "xl",
            "xxl",
            "xxxl",
          ],
        },
        quantity: { type: Number, required: true },
      },
    ],
    imageUrl: { type: String, required: true },
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    numOfRatings: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);

module.exports = Product;
