const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

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

const findUserCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId }).populate("user");
    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    cart.cartItems = cartItems;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItem = totalItem;
    cart.discounte = totalPrice - totalDiscountedPrice;

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message || "Failed to find user cart");
  }
};

const addCartItem = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    const product = await Product.findById(req.productId);

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      const createdCartItem = await cartItem.save();

      cart.cartItems.push(createdCartItem);

      await cart.save();

      return "Item added to cart";
    }
  } catch (error) {
    throw new Error(error.message || "Failed to add cart item");
  }
};
module.exports = { createCart, findUserCart, addCartItem };
