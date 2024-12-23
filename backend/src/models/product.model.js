const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    //   required: true,
  },
  discountPersent: {
    type: Number,
    //   required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  sizes: [
    {
      name: {
        type: String,
        //   enum: [
        //     "S",
        //     "M",
        //     "L",
        //     "XL",
        //     "XXL",
        //     "XXXL",
        //     "s",
        //     "m",
        //     "l",
        //     "xl",
        //     "xxl",
        //     "xxxl",
        //   ],
      },
      quantity: { type: Number, required: true },
    },
  ],
  imageUrl: { type: String, required: true },
  ratings: [{ type: Schema.Types.ObjectId, ref: "ratings" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  numRatings: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  createdAt: { type: Date, default: Date.now },
});

const Product = model("products", productSchema);

module.exports = Product;
