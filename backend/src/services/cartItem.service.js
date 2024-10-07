const CartItem = require("../models/cartItem.model");
const { findUserById } = require("../services/user.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("Cart item not found with given id", cartItemId);
    }

    const user = await findUserById(userId);
    if (!user) {
      throw new Error("User not found with given id", userId);
    }

    if (user._id.toString() === item.userId.toString()) {
      // if not working then replace it with item.userId.toString() to userId.toString()
      item.quantity = cartItemData.quantity;
      item.price = item.product.price * item.quantity;
      item.discountedPrice = item.product.discountedPrice * item.quantity;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("User not authorized to update this cart item");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to update cart item");
  }
};

const removeCartItem = async (userId, cartItemId) => {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
      return true;
    } else {
      throw new Error("User not authorized to remove cart item");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to remove cart item");
  }
};

const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId);

    return cartItem;
  } catch (error) {
    throw new Error(error.message || "Failed to find cart item");
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
