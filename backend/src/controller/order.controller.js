const orderService = require("../services/order.service");

// const createOrder = async (req, res) => {
//   try {
//     const { user } = await req;
//     const createdOrder = await createOrder(user, req.body);

//     return res.status(201).json({
//       success: true,
//       error: false,
//       message: "Order created successfully",
//       order: createdOrder,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message || "Failed to create order",
//     });
//   }
// };
const createOrder = async (req, res) => {
  try {
    const { user } = req;
    const createdOrder = await orderService.createOrder(user, req.body);

    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const findOrderbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.findOrderById(id);

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const orderHistory = async (req, res) => {
  try {
    const { user } = await req;
    const orderHistory = await orderService.usersOrderHistory(user._id);

    return res.status(200).send(orderHistory);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = { createOrder, findOrderbyId, orderHistory };
