const paymentService = require("../services/payment.service");

const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await paymentService.createPaymentLink(req.params.id); // if not working check here id is coming or not
    return res.status(200).send(paymentLink);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updatePaymentInformation = async (req, res) => {
  try {
    const respData = await paymentService.updatePaymentInformation(req.query); // if not working check here id is coming or not
    // await paymentService.updatePaymentInformation(req.query); // if not working check here id is coming or not
    return res.status(200).send(respData);
    // return res.status(200).send({
    //   message: "Your order has been placed successfully",
    //   success: true,
    // });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
