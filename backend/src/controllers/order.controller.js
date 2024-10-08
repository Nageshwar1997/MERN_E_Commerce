const {
  createOrder,
  findOrderById,
  usersOrderHistory,
} = require("../services/order.service");

const createOrderController = async (req, res) => {
  try {
    const { user } = await req;
    const createdOrder = await createOrder(user, req.body);

    return res.status(201).json({
      success: true,
      error: false,
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to create order",
    });
  }
};

const findOrderbyIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await findOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Order found successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to find order",
    });
  }
};

const orderHistoryController = async (req, res) => {
  try {
    const { user } = await req;
    const orderHistory = await usersOrderHistory(user._id);

    if (!orderHistory) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Order history not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Order history found successfully",
      orderHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to find order history",
    });
  }
};

module.exports = {
  createOrderController,
  findOrderbyIdController,
  orderHistoryController,
};
