const { razorpay } = require("../configs/razorpay.client");
const { findOrderById } = require("./order.service");

const createPaymentLink = async (orderId) => {
  const order = await findOrderById(orderId);
  // console.log("order", order);
  const paymentLinkRequest = {
    amount: order.totalDiscountedPrice * 100,
    currency: "INR",
    customer: {
      name: `${order.user.firstName} ${order.user.lastName}`,
      contact: order.user.mobileNumber,
      email: order.user.email,
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
    callback_url: "http://localhost:3000/payment/" + orderId,
    callback_method: "get",
  };

  // console.log("paymentLinkRequest", paymentLinkRequest);
  try {
    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    // console.log("paymentLink", paymentLink);

    const paymentLinkId = paymentLink.id;
    // console.log("paymentLinkId", paymentLinkId);
    const paymentLinkUrl = paymentLink.short_url;
    // console.log("paymentLinkUrl", paymentLinkUrl);
    const resData = { paymentLinkId, paymentLinkUrl };

    // console.log("resData", resData);

    return resData;
  } catch (error) {
    console.error("Error in Razorpay API call:", error);
    throw new Error(error.message || "Failed to create payment link");
  }
};

const updatePaymentInformation = async (reqData) => {
  try {
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
    console.log("paymentId, orderId", paymentId, orderId);

    const order = await findOrderById(orderId);
    console.log("order", order);

    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();
    }

    console.log("order", order);
    const resData = {
      message: "Payment successful & order placed successfully",
      success: true,
      error: false,
    };

    return resData;
  } catch (error) {
    throw new Error(error.message || "Failed to process payment");
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
