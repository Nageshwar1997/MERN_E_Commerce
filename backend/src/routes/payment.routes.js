const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const paymentController = require("../controller/payment.controller");

const router = Router();

router.post("/:id", authenticate, paymentController.createPaymentLink);
router.get("/", authenticate, paymentController.updatePaymentInformation);

module.exports = router;
