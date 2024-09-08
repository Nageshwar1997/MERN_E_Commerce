const {
  updateCartProduct,
  removeCartProduct,
} = require("../services/cartProduct.service");

const updateCartProductController = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const updatedCartProduct = await updateCartProduct(user._id, id, req.body);

    if (!updatedCartProduct) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Cart product not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Cart product updated successfully",
      updatedCartProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to update cart product",
    });
  }
};

const removeCartProductController = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const removedCartProduct = await removeCartProduct(user._id, id);

    if (!removedCartProduct) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Cart product not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Cart product removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to remove cart product",
    });
  }
};

module.exports = { updateCartProductController, removeCartProductController };
