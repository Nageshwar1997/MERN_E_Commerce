const {
  createPaymentLink,
  updatePaymentInformation,
} = require("../services/payment.service");

const createPaymentLinkController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id", id);
    const paymentLink = await createPaymentLink(id);
    console.log("paymentLink", paymentLink);
    return res.status(200).json({ paymentLink, success: true, error: false });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to create payment link",
    });
  }
};
const updatePaymentInformationController = async (req, res) => {
  try {
    await updatePaymentInformation(req.query);

    return res.status(200).json({
      message: "Payment information updated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to update payment information",
    });
  }
};

module.exports = {
  createPaymentLinkController,
  updatePaymentInformationController,
};
