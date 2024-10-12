const { Router } = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const {
  createPaymentLinkController,
  updatePaymentInformationController,
} = require("../controllers/payment.controller");

const paymentRouter = Router();

paymentRouter.post("/:id", authenticate, createPaymentLinkController);
paymentRouter.get("/", authenticate, updatePaymentInformationController);

module.exports = paymentRouter;
