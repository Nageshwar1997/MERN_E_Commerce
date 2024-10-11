const {
  removeCartItem,
  updateCartItem,
} = require("../services/cartItem.service");

const updateCartItemController = async (req, res) => {
  try {
    const { user } = await req;
    const { id } = req.params;

    const updatedCartItem = await updateCartItem(user._id, id, req.body);

    if (!updatedCartItem) {
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
      updatedCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to update cart product",
    });
  }
};

const removeCartItemController = async (req, res) => {
  try {
    const { user } = await req;
    const { id } = req.params;
    console.log("user", user, "id", id);

    const removedCartItem = await removeCartItem(user._id, id);

    if (!removedCartItem) {
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
      product: removedCartItem,
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to remove cart product",
    });
  }
};

module.exports = {
  updateCartItemController,
  removeCartItemController,
};
