const AddressModel = require("../models/address.model");
const OrderModel = require("../models/order.model");
const { findUserCart } = require("./cart.service");

const createOrder = async (user, shippingAddress) => {
  try {
    let address;

    if (shippingAddress._id) {
      let existAddress = await AddressModel.findById(shippingAddress._id);

      address = existAddress;
    } else {
      address = new AddressModel(shippingAddress);
      address.user = user;
      await address.save();

      user.addresses.push(address);
      await user.save();
    }

    const cart = await findUserCart(user._id);
    const orderProducts = [];

    cart.products.forEach((product) => {
      const orderProduct = new orderProducts({
        price: product.price,
        product: product.product,
        quantity: product.quantity,
        size: product.size,
        userId: product.userId,
        discountedPrice: product.discountedPrice,
      });

      const createdOrderProduct = orderProduct.save();
      orderProducts.push(createdOrderProduct);
    });

    const createdOrder = new OrderModel({
      user,
      orderProducts,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      totalDiscount: cart.totalDiscount,
      totalProducts: cart.totalProducts,
      shippingAddress: address,
    });

    const savedOrder = createdOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to create order");
  }
};

// it's for admin
const placeOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails = "COMPLETED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

const confirmOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to confirm order");
  }
};

const shipOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to ship order");
  }
};

const deliverOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to deliver order");
  }
};

const cancelOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to cancel order");
  }
};

const findOrderById = async (orderId) => {
  try {
    const order = await OrderModel.findById(orderId)
      .populate("user")
      .populate({ path: "orderProducts", populate: { path: "product" } })
      .populate("shippingAddress");

    if (!order) {
      throw new Error(`Order not found with id ${orderId}`);
    }

    return order;
  } catch (error) {
    throw new Error(error.message || "Failed to find order");
  }
};

const usersOrderHistory = async (userId) => {
  try {
    const orders = await OrderModel.find({
      user: userId,
      orderStatus: "PLACED",
    })
      .populate({ path: "orderProducts", populate: { path: "product" } })
      .lean();

    if (!orders) {
      throw new Error(`Orders not found with id ${userId}`);
    }

    return orders;
  } catch (error) {
    throw new Error(error.message || "Failed to find orders");
  }
};
// It's for admin
const getAllOrders = async () => {
  try {
    const allOrders = await OrderModel.find()
      .populate({ path: "orderProducts", populate: { path: "product" } })
      .lean();

    return allOrders;
  } catch (error) {
    throw new Error(error.message || "Failed to find orders");
  }
};

const deleteOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (!order) {
      throw new Error(`Order not found with id ${orderId}`);
    }

    await OrderModel.findByIdAndDelete(order._id);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete order");
  }
};

module.exports = {
  createOrder,
  placeOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
