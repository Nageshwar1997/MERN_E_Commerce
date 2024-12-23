const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const message = await productService.deleteProduct(productId);

    return res.status(201).send(message);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await productService.updateProduct(
      productId,
      req.body
    );

    return res.status(201).send(updatedProduct);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const findProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productService.findProductById(productId);

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);

    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const createMultipleProducts = async (req, res) => {
  try {
    const products = await productService.createMultipleProducts(req.body);

    return res.status(201).send({
      message: products.message,
      products: products.products,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
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
