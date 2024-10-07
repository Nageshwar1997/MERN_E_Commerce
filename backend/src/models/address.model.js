const { model, Schema } = require("mongoose");

const AddressSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    alternateMobileNumber: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Address = model("Address", AddressSchema);

module.exports = Address;
