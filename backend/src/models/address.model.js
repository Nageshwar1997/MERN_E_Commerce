const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  mobile: { type: String, required: true },
});

const Address = model("addresses", addressSchema);
module.exports = Address;
