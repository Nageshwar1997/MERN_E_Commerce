const mongoose = require("mongoose");
const cartSchema = require("../schemas/cart.schema");

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
