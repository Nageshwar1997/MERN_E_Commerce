const { model, Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
    level: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const Category = model("Category", CategorySchema);

module.exports = Category;