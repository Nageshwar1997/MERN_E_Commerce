const mongoose = require("mongoose");
const orderProductSchema = require("../schemas/orderProduct.schema");

const orderProductModel = mongoose.model("OrderProduct", orderProductSchema);

module.exports = orderProductModel;
