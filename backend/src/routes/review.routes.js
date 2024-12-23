const { Router } = require("express");

const reviewController = require("../controller/review.controller");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.post("/create", authenticate, reviewController.createReview);
router.get("/product/:productId", authenticate, reviewController.getAllReviews);

module.exports = router;
