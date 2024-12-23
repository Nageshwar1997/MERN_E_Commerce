const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems.model");
const cartService = require("../services/cart.service");

const createOrder = async (user, shippAddress) => {
  try {
    let address;

    if (shippAddress._id) {
      let existAddress = await Address.findById(shippAddress._id);
      address = existAddress;
    } else {
      address = new Address(shippAddress);
      address.user = user;
      await address.save();

      user.address.push(address);
      await user.save();

      // console.log("user", user);
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
      const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discountedPrice: item.discountedPrice,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);

      console.log("orderItems", orderItems);
    }

    const createdOrder = new Order({
      user, // This may cause circular structure
      orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discounte: cart.discounte,
      totalItem: cart.totalItem,
      shippingAddress: address,
    });

    const savedOrder = await createdOrder.save();

    return savedOrder;

    // Sanitize the saved order before returning
    // const sanitizedOrder = savedOrder.toObject();
    // delete sanitizedOrder.user.addresses; // Avoid circular reference

    // return sanitizedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to create order");
  }
};

const placeOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

const confirmedOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

const shipOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

const deliverOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

const cancelOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

const findOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress")
      .lean();

    return order;
  } catch (error) {
    throw new Error(error.message || "Failed to find order");
  }
};

const usersOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: "PLACED",
      // orderStatus: "PLACED" || "CONFIRMED" || "SHIPPED" || "DELIVERED", // if not working just write "PLACED"
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message || "Failed to find orders");
  }
};

const getAllOrders = async () => {
  try {
    const allOrders = await Order.find()
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return allOrders;
  } catch (error) {
    throw new Error(error.message || "Failed to find orders");
  }
};

const deleteOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    await Order.findByIdAndDelete(order._id);
    return "Order deleted successfully";
  } catch (error) {
    throw new Error(error.message || "Failed to delete order");
  }
};

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
