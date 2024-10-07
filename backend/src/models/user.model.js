const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "CUSTOMER",
      enum: ["CUSTOMER", "ADMIN"],
    },
    mobileNumber: { type: String, required: true },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    paymentInformation: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("User", UserSchema);

module.exports = User;
