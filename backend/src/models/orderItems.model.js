const { model, Schema } = require("mongoose");

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

const OrderItem = model("orderItems", orderItemSchema);

module.exports = OrderItem;
