const { findUserCart, addCartItem } = require("../services/cart.service");

const findUserCartController = async (req, res) => {
  try {
    const { user } = await req;
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

const addItemToCartController = async (req, res) => {
  try {
    const { user } = await req;
    const cartItem = await addCartItem(user._id, req.body);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product added to cart successfully",
      cartItem,
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
  findUserCartController,
  addItemToCartController,
};
