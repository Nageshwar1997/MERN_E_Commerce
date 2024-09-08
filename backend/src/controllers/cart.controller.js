const { findUserCart, addCartProduct } = require("../services/cart.service");

const getUserCartController = async (req, res) => {
  try {
    const { user } = req;
    const cart = await findUserCart(user._id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to retrieve cart",
    });
  }
};
const addProductToCartController = async (req, res) => {
  try {
    const { user } = req;
    const cartProduct = await addCartProduct(user._id, req.body);

    if (!cartProduct) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product added to cart successfully",
      cartProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to add product to cart",
    });
  }
};

module.exports = {
  getUserCartController,
  addProductToCartController,
};
