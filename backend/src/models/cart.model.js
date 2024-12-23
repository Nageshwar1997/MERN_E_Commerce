const { model, Schema } = require("mongoose");

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  cartItems: [
    { type: Schema.Types.ObjectId, ref: "cartItems", required: true },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
  totalItem: { type: Number, required: true, default: 0 },
  totalDiscountedPrice: { type: Number, required: true, default: 0 },
  discounte: { type: Number, required: true, default: 0 },
});

const Cart = model("cart", cartSchema);

module.exports = Cart;
