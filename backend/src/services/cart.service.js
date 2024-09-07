const CartModel = require("../models/cart.model");

const createCart = async (user) => {
  try {
    /*
    const cart = new CartModel({ user });
    const createdCart = await cart.save();
    return createdCart;
    */
    // OR
    const createdCart = await CartModel.create({ user });
    return createdCart;
  } catch (error) {
    throw new Error(error.message || "Failed to create cart");
  }
};

module.exports = { createCart };