const { Router } = require("express");

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.get("/", authenticate, productController.getAllProducts);
router.get("/id/:id", authenticate, productController.findProductById);

module.exports = router;
