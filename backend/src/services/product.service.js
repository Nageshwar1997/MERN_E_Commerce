const Category = require("../models/category.model");
const Product = require("../models/product.model");

const createProduct = async (reqData) => {
  try {
    let topLevel = await Category.findOne({
      name: reqData.topLevelCategory,
    });

    if (!topLevel) {
      topLevel = new Category({
        name: reqData.topLevelCategory,
        level: 1,
      });
    }

    let secondLevel = await Category.findOne({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });

    if (!secondLevel) {
      secondLevel = new Category({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
        level: 2,
      });
    }

    let thirdLevel = await Category.findOne({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
      thirdLevel = new Category({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
        level: 3,
      });
    }

    const product = new Product({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountedPrice: reqData.discountedPrice,
      discount: reqData.discount,
      imageUrl: reqData.imageUrl,
      brand: reqData.brand,
      price: reqData.price,
      sizes: reqData.sizes,
      quantity: reqData.quantity,
      category: thirdLevel._id,
    });

    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    throw new Error(error.message || "Failed to create product");
  }
};
