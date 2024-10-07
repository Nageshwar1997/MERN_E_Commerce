const { model, Schema } = require("mongoose");

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      { type: Schema.Types.ObjectId, ref: "CartItem", required: true },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    totalItems: { type: Number, required: true, default: 0 },
    totalDiscountedPrice: { type: Number, required: true, default: 0 },
    totalDiscount: { type: Number, required: true, default: 0 },
  },
  {
    versionKey: false,
  }
);

const Cart = model("Cart", CartSchema);

module.exports = Cart;
