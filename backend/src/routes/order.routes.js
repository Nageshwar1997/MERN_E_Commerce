const { Router } = require("express");

const orderController = require("../controller/order.controller");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.post("/", authenticate, orderController.createOrder);
router.get("/user", authenticate, orderController.orderHistory);
router.get("/:id", authenticate, orderController.findOrderbyId);

module.exports = router;
