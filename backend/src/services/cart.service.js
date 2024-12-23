const Cart = require("../models/cart.model");

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;

    /** OR
    const createdCart = await Cart.create({ user });
    return createdCart;
     */
  } catch (error) {
    throw new Error(error.message || "Failed to create cart");
  }
};

module.exports = {
  createCart,
};
