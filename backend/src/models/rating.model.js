const { model, Schema } = require("mongoose");

const RatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Rating = model("Rating", RatingSchema);

module.exports = Rating;
