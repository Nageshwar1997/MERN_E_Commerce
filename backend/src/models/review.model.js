const mongoose = require("mongoose");
const reviewSchema = require("../schemas/review.schema");

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
