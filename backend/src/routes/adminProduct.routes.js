const { Router } = require("express");

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleProducts);
router.delete("/:id", authenticate, productController.deleteProduct);
router.put("/:id", authenticate, productController.updateProduct);

module.exports = router;
