const reviewService = require("../services/review.service");

const createReview = async (req, res) => {
  try {
    const { user } = req;

    const review = await reviewService.createReview(req.body, user);

    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    const reviews = await reviewService.getAllReviews(productId);

    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = { createReview, getAllReviews };
