const Rating = require("../models/rating.model");
const { findProductById } = require("./product.service");

const createRating = async (reqData, user) => {
  try {
    const product = await findProductById(reqData.productId);

    const rating = new Rating({
      user: user._id,
      product: product._id,
      rating: reqData.rating,
    });

    await product.save();
    const savedRating = await rating.save();

    return savedRating;
  } catch (error) {
    throw new Error(error.message || "Failed to create rating");
  }
};

const getProductRatings = async (productId) => {
  try {
    const allRatings = await Rating.find({ product: productId });
    if (!allRatings) {
      throw new Error("Ratings not found for the product", productId);
    }
    return allRatings;
  } catch (error) {
    throw new Error(error.message || "Failed to get ratings");
  }
};

module.exports = { createRating, getProductRatings };
