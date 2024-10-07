const { model, Schema } = require("mongoose");

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
  }
);

const OrderItem = model("OrderItem", OrderItemSchema);

module.exports = OrderItem;
