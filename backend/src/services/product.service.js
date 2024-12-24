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

      await topLevel.save();
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

      await secondLevel.save();
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

      await thirdLevel.save();
    }

    const product = new Product({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountedPrice: reqData.discountedPrice,
      discountPersent: reqData.discountPersent,
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
    const product = await findProductById(productId);

    const deletedProduct = await Product.findByIdAndDelete(product._id);
    return "Product deleted successfully";
  } catch (error) {
    throw new Error(error.message || "Failed to delete product");
  }
};

const updateProduct = async (productId, reqData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
    //   const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, {
    //     new: true,
    //   });
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message || "Failed to update product");
  }
};

const findProductById = async (productId) => {
  try {
    const product = await Product.findById(productId)
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

    pageSize = parseInt(pageSize) || 10; // Ensure pageSize is a number
    //   pageNumber = parseInt(pageNumber) || 1; // Ensure pageNumber is a number

    //   let query = Product.find();
    let query = Product.find().populate("category");

    // Category filtering
    if (category) {
      const existCategory = await Category.findOne({ name: category });
      if (existCategory) {
        query = query.where("category").equals(existCategory._id);
      } else {
        return { content: [], currentPage: 1, totalPages: 1 };
      }
    }

    // Color filtering
    if (
      color
      // && color !== "undefined"
    ) {
      const colorSet = new Set(
        color.split(",").map((color) => color.trim().toLowerCase())
      );
      //   const colorRegex = new RegExp([...colorSet].join("|"), "i");
      //   query = query.where("color").regex(colorRegex);

      const colorRegex =
        colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
      // query = colorRegex ? query.where("color").regex(colorRegex) : query;
      query = query.where("color").regex(colorRegex);
    }

    // Size filtering
    // console.log("sizes", sizes);
    if (sizes) {

        const sizeSet = new Set(sizes.split(",").map((size) => size.trim()));
      // const sizeSet = new Set(sizes);
      query = query.where("sizes.name").in([...sizeSet]);
    }

    // Price filtering
    if (minPrice && maxPrice) {
      if (minPrice < maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
      }
    }

    // Discount filtering
    if (minDiscount) {
      query = query.where("discountPersent").gte(minDiscount);
    }

    // Stock filtering
    if (stock) {
      if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock === "out_of_stock") {
        query = query.where("quantity").lt(1);
      }
    }

    // Sorting
    if (sort) {
      const sortDirection = sort === "price_high_to_low" ? -1 : 1; // Default sort order
      query = query.sort({ discountedPrice: sortDirection });
    }

    // Total products count
    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;

    query = query.skip(skip).limit(pageSize);
    // .populate("category");

    // Executing the query
    const products = await query.exec();

    // Pagination details
    const totalPages = Math.ceil(totalProducts / pageSize);

    return {
      content: products,
      currentPage: pageNumber,
      totalPages,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to get products");
  }
};

const createMultipleProducts = async (products) => {
  try {
    const createdProducts = [];
    for (let product of products) {
      const createdProduct = await createProduct(product);
      createdProducts.push(createdProduct);
    }

    return {
      message: "Products created successfully",
      products: createdProducts,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to create multiple products");
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
};
