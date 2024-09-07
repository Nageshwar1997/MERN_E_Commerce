const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    level: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = categorySchema;
