const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    review: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Review = model("Review", ReviewSchema);

module.exports = Review;
