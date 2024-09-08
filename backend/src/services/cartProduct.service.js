const CartProductModel = require("../models/cartProduct.model");
const { findUserById } = require("./user.service");

const updateCartProduct = async (userId, cartProductId, cartProductData) => {
  try {
    const product = await findCartProductById(cartProductId);
    if (!product) {
      throw new Error("Cart product not found with given id", cartProductId);
    }

    const user = await findUserById(product.userId);

    if (!user) {
      throw new Error("User not found with given id", product.userId);
    }

    if (user._id.toString() === userId.toString()) {
      product.quantity = cartProductData.quantity;
      product.price = product.price * product.quantity;
      product.discountedPrice = product.discountedPrice * product.quantity;

      const updatedCartProduct = await product.save();
      return updatedCartProduct;
    } else {
      throw new Error("User not authorized to update cart product");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to update cart product");
  }
};

const removeCartProduct = async (userId, cartProductId) => {
  try {
    const cartProduct = await findCartProductById(cartProductId);
    const user = await findUserById(userId);

    if (user._id.toString() === cartProduct.userId.toString()) {
      await CartProductModel.findByIdAndDelete(cartProductId);
      return true;
    } else {
      throw new Error("User not authorized to remove cart product");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to remove cart product");
  }
};

const findCartProductById = async (cartProductId) => {
  try {
    const cartProduct = await findCartProductById(cartProductId);
    if (!cartProduct) {
      throw new Error("Cart product not found with given id", cartProductId);
    }

    return cartProduct;
  } catch (error) {
    throw new Error(error.message || "Failed to find cart product");
  }
};

module.exports = {
  updateCartProduct,
  removeCartProduct,
  findCartProductById,
};
