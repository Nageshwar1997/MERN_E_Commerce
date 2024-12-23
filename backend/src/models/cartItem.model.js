const { model, Schema } = require("mongoose");

const cartItemSchema = new Schema({
  cart: { type: Schema.Types.ObjectId, ref: "cart", required: true },
  product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  size: { type: String, required: true, default: "S" },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true, default: 0 },
  discountedPrice: { type: Number, required: true, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true }, // if something is wrong use user only
});

const CartItem = model("cartItems", cartItemSchema);

module.exports = CartItem;
