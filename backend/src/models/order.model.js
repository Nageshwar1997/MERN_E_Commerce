const { model, Schema } = require("mongoose");

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      { type: Schema.Types.ObjectId, ref: "OrderItem", required: true },
    ],
    orderDate: { type: Date, required: true, default: Date.now },
    deliveryDate: Date,
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentDetails: {
      paymentMethod: String,
      transactionId: String,
      paymentId: String,
      paymentStatus: { type: String, default: "PENDING" },
    },
    totalPrice: { type: Number, required: true },
    totalDiscountedPrice: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    orderStatus: { type: String, required: true, default: "PENDING" }, 
    totalItems: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = model("Order", OrderSchema);

module.exports = Order;