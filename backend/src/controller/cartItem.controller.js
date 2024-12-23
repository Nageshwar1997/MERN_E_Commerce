const cartItemService = require("../services/cartItem.service");

const updateCartItem = async (req, res) => {
  try {
    const { user } = await req;
    const { id } = req.params;

    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      id,
      req.body
    );

    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { user } = await req;
    const { id } = req.params;

    await cartItemService.removeCartItem(user._id, id);

    return res.status(200).send("Cart item removed successfully");
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
};
