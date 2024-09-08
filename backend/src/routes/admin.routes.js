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
const adminRouter = express.Router();

adminRouter.get("/", authenticateUser, getAllOrdersByAdminController);
adminRouter.put(
  "/:orderId/confirm",
  authenticateUser,
  confirmOrderByAdminController
);
adminRouter.put("/:orderId/ship", authenticateUser, shipOrderByAdminController);
adminRouter.put(
  "/:orderId/deliver",
  authenticateUser,
  deliverOrderByAdminController
);
adminRouter.put(
  "/:orderId/cancel",
  authenticateUser,
  cancelOrderByAdminController
);
adminRouter.put(
  "/:orderId/delete",
  authenticateUser,
  deleteOrderByAdminController
);

module.exports = adminRouter;
