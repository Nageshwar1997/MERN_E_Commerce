const CartModel = require("../models/cart.model");
const CartProductModel = require("../models/cartProduct.model");
const ProductModel = require("../models/product.model");

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

const findUserCart = async (userId) => {
  try {
    let cart = await CartModel.findOne({ user: userId });
    const cartProducts = await CartProductModel.find({
      cart: cart._id,
    }).populate("Product");

    cart.products = cartProducts;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalDiscount = 0;
    let totalProducts = 0;

    cartProducts.forEach((product) => {
      totalPrice += product.price;
      totalDiscountedPrice += product.discountedPrice;
      totalDiscount += product.discount;
      totalProducts += product.quantity;
    });

    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalDiscount = totalDiscount;
    cart.totalProducts = totalProducts;

    return cart;
  } catch (error) {
    throw new Error(error.message || "Failed to find user cart");
  }
};

const addCartProduct = async (userId, reqData) => {
  try {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    const product = await ProductModel.findById(reqData.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const existingProduct = await CartProductModel.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!existingProduct) {
      const cartProduct = new CartProductModel({
        product: product._id,
        cart: cart._id,
        userId,
        price: product.price,
        discountedPrice: product.discountedPrice,
        size: product.size,
        discountedPrice: product.discountedPrice,
      });
      const createdCartProduct = await cartProduct.save();

      cart.products.push(createdCartProduct);
      await cart.save();

      return "Product added to cart";
    }

    if (existingProduct) {
      throw new Error("Product already in cart");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to add product to cart");
  }
};

module.exports = { createCart, findUserCart, addCartProduct };
