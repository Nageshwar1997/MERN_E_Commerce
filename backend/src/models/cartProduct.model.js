const mongoose = require("mongoose");
const cartProductSchema = require("../schemas/cartProduct.schema");

const CartProductModel = mongoose.model("CartProduct", cartProductSchema);

module.exports = CartProductModel;
