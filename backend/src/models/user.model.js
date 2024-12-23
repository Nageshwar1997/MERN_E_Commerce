const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  mobile: { type: String, required: true },
  address: [{ type: Schema.Types.ObjectId, ref: "addresses" }],
  paymentInformation: [
    { type: Schema.Types.ObjectId, ref: "payment_information" },
  ],
  ratings: [{ type: Schema.Types.ObjectId, ref: "ratings" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  createdAt: { type: Date, default: Date.now },
});
const User = model("users", userSchema);
module.exports = User;
