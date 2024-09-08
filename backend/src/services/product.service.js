const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");

const createProduct = async (reqData) => {
  try {
    let topLevel = await CategoryModel.findOne({
      name: reqData.topLevelCategory,
    });

    if (!topLevel) {
      topLevel = new CategoryModel({
        name: reqData.topLevelCategory,
        level: 1,
      });
    }

    let secondLevel = await CategoryModel.findOne({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });

    if (!secondLevel) {
      secondLevel = new CategoryModel({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
        level: 2,
      });
    }

    let thirdLevel = await CategoryModel.findOne({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
      thirdLevel = new CategoryModel({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
        level: 3,
      });
    }

    const product = new ProductModel({
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

const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await findProductById(productId);

    await ProductModel.findByIdAndDelete(deletedProduct._id);
    return "Product deleted successfully";
  } catch (error) {
    throw new Error(error.message || "Failed to delete product");
  }
};

const updateProduct = async (productId, reqData) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      reqData,
      {
        new: true,
      }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message || "Failed to update product");
  }
};

const findProductById = async (productId) => {
  try {
    const product = await ProductModel.findById(productId)
      .populate("category")
      .exec();

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }
    return product;
  } catch (error) {
    throw new Error(error.message || "Failed to find product");
  }
};

const getAllProducts = async (reqQuery) => {
  try {
    let {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
    } = reqQuery;

    pageSize = pageSize || 10;
    pageNumber = pageNumber || 1;

    let query = await ProductModel.find().populate("category");

    if (category) {
      const existCategory = await CategoryModel.findOne({ name: category });

      if (existCategory) {
        query = await query.where("category").equals(existCategory._id);
      } else {
        return {
          content: [],
          totalPages: 0,
          currentPage: 1,
        };
      }
    }

    if (color) {
      const colorSet = new Set(
        color.split(",").map((color) => color.trim().toLowerCase())
      );

      const colorRegex =
        colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

      query = await query.where("color").regex(colorRegex);
    }

    if (sizes) {
      const sizeSet = new Set(sizes.split(",").map((size) => size.trim()));

      query = await query.where("sizes.name").in([...sizeSet]);
    }

    if (minPrice && maxPrice) {
      query = await query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
      query = await query.where("discount").gte(minDiscount);
    }

    if (stock) {
      if (stock === "in_stock") {
        query = await query.where("quantity").gte(1);
      } else if (stock === "out_of_stock") {
        query = await query.where("quantity").lte(0);
      } else {
        query = await query.where("quantity").gte(1).lte(0);
      }
    }

    if (sort) {
      const sortOrder = sort === "price_high_to_low" ? -1 : 1;
      query = query.sort({ discountedPrice: sortOrder });
    }

    const totalProducts = await ProductModel.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;

    query = query.skip(skip).limit(pageSize);
    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts / pageSize);
    const currentPage = pageNumber;
    return {
      content: products,
      totalPages,
      currentPage,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to get products");
  }
};

const createMultipleProducts = async (products) => {
  try {
    products.forEach(async (product) => {
      await createProduct(product);
    });
  } catch (error) {
    throw new Error(error.message || "Failed to create multiple products");
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
};
