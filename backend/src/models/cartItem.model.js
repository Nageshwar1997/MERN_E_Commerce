const { model, Schema } = require("mongoose");

const CartItemSchema = new Schema(
  {
    cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
  }
);

const CartItem = model("CartItem", CartItemSchema);

module.exports = CartItem;
