const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "CUSTOMER" },
    phoneNumber: { type: Number, required: true },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    paymentInformation: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    ],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = userSchema;
