const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Failed to retrieve orders",
    });
  }
};

const confirmedOrders = async (req, res) => {
  try {
    const { orderId } = req.params;

    const orders = await orderService.confirmedOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Failed to confirm order",
    });
  }
};

const shipOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.shipOrder(orderId);

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Failed to ship order",
    });
  }
};

const deliverOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.deliverOrder(orderId);

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Failed to deliver order",
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.cancelOrder(orderId);

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Failed to deliver order",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.deleteOrder(orderId);

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Failed to deliver order",
    });
  }
};

module.exports = {
  getAllOrders,
  confirmedOrders,
  shipOrder,
  deliverOrder,
  cancelOrder,
  deleteOrder,
};
