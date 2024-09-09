const express = require("express");
const authenticateUser = require("../middlewares/authenticate");
const {
  getAllOrdersByAdminController,
  confirmOrderByAdminController,
  shipOrderByAdminController,
  deliverOrderByAdminController,
  cancelOrderByAdminController,
  deleteOrderByAdminController,
} = require("../controllers/adminOrder.controller");
const adminOrderRouter = express.Router();

adminOrderRouter.get("/", authenticateUser, getAllOrdersByAdminController);
adminOrderRouter.put(
  "/:orderId/confirm",
  authenticateUser,
  confirmOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/ship",
  authenticateUser,
  shipOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/deliver",
  authenticateUser,
  deliverOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/cancel",
  authenticateUser,
  cancelOrderByAdminController
);
adminOrderRouter.put(
  "/:orderId/delete",
  authenticateUser,
  deleteOrderByAdminController
);

module.exports = adminOrderRouter;
