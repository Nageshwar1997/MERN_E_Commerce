const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const {
  getAllOrdersByAdminController,
  confirmOrderByAdminController,
  shipOrderByAdminController,
  deliverOrderByAdminController,
  cancelOrderByAdminController,
  deleteOrderByAdminController,
} = require("../controllers/adminOrder.controller");

const adminOrderRouter = express.Router();

adminOrderRouter.get("/", authenticate, getAllOrdersByAdminController);
adminOrderRouter.put(
  "/:orderId/confirm",
  authenticate,
  confirmOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/ship",
  authenticate,
  shipOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/deliver",
  authenticate,
  deliverOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/cancel",
  authenticate,
  cancelOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/delete",
  authenticate,
  deleteOrderByAdminController
);

module.exports = adminOrderRouter;
