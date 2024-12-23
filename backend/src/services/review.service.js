const Review = require("../models/review.model");
const productService = require("./product.service");

const createReview = async (reqData, user) => {
  try {
    const product = await productService.findProductById(reqData.productId);

    const review = new Review({
      user: user._id,
      product: reqData._id,
      review: reqData.review,
      createsAt: new Date(),
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
    const product = await productService.findProductById(productId);

    // if (!product) {
    //   throw new Error("Product not found");
    // }

    const reviews = await Review.find({ product: product._id }).populate(
      "user"
    );

    // if (!reviews) {
    //   throw new Error("Reviews not found for the product", productId);
    // }

    return reviews;
  } catch (error) {
    throw new Error(error.message || "Failed to get reviews");
  }
};

module.exports = { createReview, getAllReviews };
