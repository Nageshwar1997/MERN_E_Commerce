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
    let cart = await Cart.findOne({ user: userId });
    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    cart.cartItems = cartItems;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;

    cartItems.forEach((cartItem) => {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItems += cartItem.quantity;
    });

    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItems = totalItems;
    cart.totalDiscount = totalPrice - totalDiscountedPrice;

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message || "Failed to find user cart");
  }
};

const addCartItem = async (userId, reqData) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const product = await Product.findById(reqData.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const productInCart = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!productInCart) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: reqData.quantity,
        userId,
        price: product.price,
        size: reqData.size,
        discount: product.discountPercent,
        discountedPrice: product.discountedPrice,
      });

      const createdCartItem = await cartItem.save();

      cart.cartItems.push(createdCartItem);

      await cart.save();

      return createdCartItem;
    }
  } catch (error) {
    throw new Error(error.message || "Failed to add cart item");
  }
};

module.exports = {
  createCart,
  findUserCart,
  addCartItem,
};
