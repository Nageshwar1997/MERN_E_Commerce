const mongoose = require("mongoose");
const ratingSchema = require("../schemas/rating.schema");

const RatingModel = mongoose.model("Rating", ratingSchema);

module.exports = RatingModel;
