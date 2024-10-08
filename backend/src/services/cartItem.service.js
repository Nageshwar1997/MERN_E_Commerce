const CartItem = require("../models/cartItem.model");
const { findUserById } = require("../services/user.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    console.log("userId, cartItemId, cartItemData", userId, cartItemId, cartItemData);
    const item = await findCartItemById(cartItemId);
    // console.log("item", item);

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

const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId).populate("product");

    return cartItem;
  } catch (error) {
    throw new Error(error.message || "Failed to find cart item");
  }
};

const removeCartItem = async (userId, cartItemId) => {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await findUserById(userId);
    console.log("user", user, "cartItemId", cartItemId);

    if (user._id.toString() === cartItem.userId.toString()) {
      const deletedCartItem = await CartItem.findByIdAndDelete(cartItemId);


      return deletedCartItem;
    } else {
      throw new Error("User not authorized to remove cart item");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to remove cart item");
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
