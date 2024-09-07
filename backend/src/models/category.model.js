const mongoose = require("mongoose");
const categorySchema = require("../schemas/category.schema");

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
