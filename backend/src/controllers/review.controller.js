const { createReview, getAllReviews } = require("../services/review.service");

const createReviewController = async (req, res) => {
  try {
    const { user } = req;

    const review = await createReview(req.body, user);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found to add review",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to create review",
    });
  }
};

const getAllReviewsController = async (req, res) => {
  try {
    const productId = req.params.id;

    const reviews = await getAllReviews(productId);

    if (!reviews) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Review not found for the product",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Reviews found successfully",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to get reviews",
    });
  }
};

module.exports = { createReviewController, getAllReviewsController };
