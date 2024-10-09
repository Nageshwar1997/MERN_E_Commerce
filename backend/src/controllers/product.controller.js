const {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
} = require("../services/product.service");

// const createProductController = async (req, res) => {
//   try {
//     const product = await createProduct(req.body);

//     if (!product) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Failed to create product",
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       error: false,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message || "Failed to create product",
//     });
//   }
// };

const createProductController = async (req, res) => {
  try {
    const product = await createProduct(req.body);

    if (!product) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Failed to create product",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to create product",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product not found to delete",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      deletedProduct: deletedProduct.deletedProduct,
      message: deletedProduct.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to delete product",
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await updateProduct(productId, req.body);

    if (!updatedProduct) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product not found to update",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to update product",
    });
  }
};

const findProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await findProductById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Product found successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to find product",
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts(req.query);

    if (!products) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Products not found",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: "Products found successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to find products",
    });
  }
};

const createMultipleProductsController = async (req, res) => {
  try {
    const products = await createMultipleProducts(req.body);

    if (!products) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Something went wrong",
      });
    }

    return res.status(201).json({
      success: true,
      error: false,
      message: products.message,
      products: products.products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to create products",
    });
  }
};

module.exports = {
  createProductController,
  deleteProductController,
  updateProductController,
  findProductByIdController,
  getAllProductsController,
  createMultipleProductsController,
};
