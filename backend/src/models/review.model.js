const mongoose = require("mongoose");
const reviewSchema = require("../schemas/review.model");

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
