const mongoose = require("mongoose");
const orderSchema = require("../schemas/order.schema");

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
