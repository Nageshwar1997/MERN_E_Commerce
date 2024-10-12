const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems");
const { findUserCart } = require("./cart.service");

// const createOrder = async (user, shippingAddress) => {
//   try {
//     let address;

//     if (shippingAddress._id) {
//       let existAddress = await Address.findById(shippingAddress._id);

//       address = existAddress;
//     } else {
//       address = new Address(shippingAddress);
//       address.user = user;
//       await address.save();

//       user.addresses.push(address);
//       await user.save();
//     }

//     const cart = await findUserCart(user._id);
//     const orderItems = [];

//     for (const item of cart.cartItems) {
//       const orderItem = new OrderItem({
//         price: item.price,
//         product: item.product,
//         quantity: item.quantity,
//         size: item.size,
//         userId: item.userId,
//         discountedPrice: item.discountedPrice,
//       });

//       const createdOrderItem = await orderItem.save();
//       orderItems.push(createdOrderItem);
//     }

//     const createdOrder = new Order({
//       user,
//       orderItems,
//       totalPrice: cart.totalPrice,
//       totalDiscountedPrice: cart.totalDiscountedPrice,
//       totalDiscount: cart.totalDiscount,
//       totalItems: cart.totalItems,
//       shippingAddress: address,
//     });

//     const savedOrder = createdOrder.save();
//     return savedOrder;
//   } catch (error) {
//     throw new Error(error.message || "Failed to create order");
//   }
// };
const createOrder = async (user, shippingAddress) => {
  try {
    let address;

    if (shippingAddress._id) {
      let existAddress = await Address.findById(shippingAddress._id);
      address = existAddress;
    } else {
      address = new Address(shippingAddress);
      address.user = user;
      await address.save();

      user.addresses.push(address);
      await user.save();
    }

    const cart = await findUserCart(user._id);
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
    }

    const createdOrder = new Order({
      user, // This may cause circular structure
      orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      totalDiscount: cart.totalDiscount,
      totalItems: cart.totalItems,
      shippingAddress: address,
    });

    const savedOrder = await createdOrder.save();

    // Sanitize the saved order before returning
    const sanitizedOrder = savedOrder.toObject();
    delete sanitizedOrder.user.addresses; // Avoid circular reference

    return sanitizedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to create order");
  }
};

const placeOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

// it's for admin
const confirmOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.orderStatus = "CONFIRMED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

// it's for admin
const shipOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.orderStatus = "SHIPPED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

// it's for admin
const deliverOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.orderStatus = "DELIVERED";

    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

// it's for admin
const cancelOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

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
      .populate("shippingAddress").lean();

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
    const orders = await Order.find({
      user: userId,
      orderStatus: "PLACED" || "CONFIRMED" || "SHIPPED" || "DELIVERED", // if not working just write "PLACED"
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
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

    if (!order) {
      throw new Error(`Order not found with id ${orderId}`);
    }

    await Order.findByIdAndDelete(order._id);
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
