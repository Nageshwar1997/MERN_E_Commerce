const {
  createRating,
  getProductRatings,
} = require("../services/rating.service");

const createRatingController = async (req, res) => {
  try {
    const { user } = req;

    const rating = await createRating(req.body, user);

    if (!rating) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Rating not created for the product",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Rating created successfully",
      rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to create rating",
    });
  }
};

const getAllRatingsController = async (req, res) => {
  try {
    const productId = req.params.productId;

    const ratings = await getProductRatings(productId);

    if (!ratings) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Ratings not found for the product",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Ratings found successfully",
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to get ratings",
    });
  }
};

module.exports = { createRatingController, getAllRatingsController };
