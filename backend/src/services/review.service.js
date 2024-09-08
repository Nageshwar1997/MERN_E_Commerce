const ReviewModel = require("../models/review.model");
const { findProductById } = require("./product.service");

const createReview = async (reqData, user) => {
  try {
    const product = await findProductById(reqData.productId);

    const review = new ReviewModel({
      user: user._id,
      product: reqData._id,
      review: reqData.review,
    });

    await product.save();
    await review.save();

    return review;
  } catch (error) {
    throw new Error(error.message || "Failed to create review");
  }
};

const getAllReviews = async (productId) => {
  try {
    const product = await findProductById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const reviews = await ReviewModel.find({ product: product._id }).populate(
      "user"
    );

    if (!reviews) {
      throw new Error("Reviews not found for the product", productId);
    }

    return reviews;
  } catch (error) {
    throw new Error(error.message || "Failed to get reviews");
  }
};

module.exports = { createReview, getAllReviews };
