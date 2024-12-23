const { Router } = require("express");

const ratingController = require("../controller/rating.controller");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.post("/create", authenticate, ratingController.createRating);
router.put("/product/:productId", authenticate, ratingController.getAllRatings);

module.exports = router;
