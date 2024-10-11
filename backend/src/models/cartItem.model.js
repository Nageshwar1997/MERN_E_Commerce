const { model, Schema } = require("mongoose");

const CartItemSchema = new Schema(
  {
    cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, required: true, default: "S" },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 },
    discountedPrice: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
  }
);

const CartItem = model("CartItem", CartItemSchema);

module.exports = CartItem;
