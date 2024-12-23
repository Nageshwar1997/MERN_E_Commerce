const { model, Schema } = require("mongoose");

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  review: { type: String, required: true },
  createsAt: { type: Date, default: Date.now },
});

const Review = model("reviews", reviewSchema);

module.exports = Review;
