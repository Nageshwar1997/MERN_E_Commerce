const {
  getAllOrders,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  deleteOrder,
} = require("../services/order.service");

const getAllOrdersByAdminController = async (req, res) => {
  try {
    const orders = await getAllOrders();

    if (!orders) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Orders not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to retrieve orders",
    });
  }
};

const confirmOrderByAdminController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await confirmOrder(orderId);

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
      message: "Order confirmed successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to confirm order",
    });
  }
};

const shipOrderByAdminController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await shipOrder(orderId);

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
      message: "Order shipped successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to ship order",
    });
  }
};

const deliverOrderByAdminController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await deliverOrder(orderId);

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
      message: "Order delivered successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to deliver order",
    });
  }
};

const cancelOrderByAdminController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await cancelOrder(orderId);

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
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to cancel order",
    });
  }
};

const deleteOrderByAdminController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await deleteOrder(orderId);

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
      message: "Order deleted successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to delete order",
    });
  }
};

module.exports = {
  getAllOrdersByAdminController,
  confirmOrderByAdminController,
  shipOrderByAdminController,
  deliverOrderByAdminController,
  cancelOrderByAdminController,
  deleteOrderByAdminController,
};
