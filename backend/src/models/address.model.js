const mongoose = require("mongoose");
const addressSchema = require("../schemas/address.schema");

const AddressModel = mongoose.model("Address", addressSchema);

module.exports = AddressModel;
