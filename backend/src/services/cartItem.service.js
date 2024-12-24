const CartItem = require("../models/cartItem.model");
const userService = require("../services/user.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("Cart item not found with given id", cartItemId);
    }

    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("User not found with given id", userId);
    }

    if (user._id.toString() === userId.toString()) {
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
  // console.log("userId, cartItemId", userId, cartItemId);
  try {
    const cartItem = await findCartItemById(cartItemId);

    //   console.log("cartItem", cartItem);
    const user = await userService.findUserById(userId);
    //   console.log("user", user, "cartItemId", cartItemId);

    //   console.log(
    //     "user._id.toString() === cartItem.userId.toString()",
    //     user._id.toString() === cartItem.userId.toString()
    //   );

    if (user._id.toString() === cartItem.userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);

      return "Cart item removed successfully";
    } else {
      throw new Error("User not authorized to remove cart item");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to remove cart item");
  }
};

const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId).populate("product");

    if (!cartItem) {
      throw new Error("Cart item not found with given id", cartItemId);
    }

    return cartItem;
  } catch (error) {
    throw new Error(error.message || "Failed to find cart item");
  }
};

module.exports = { updateCartItem, removeCartItem, findCartItemById };
