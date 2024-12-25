const razorpay = require("../config/razorpay.client");
const orderService = require("./order.service");
const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);
    const paymentLinkRequest = {
      amount: order.totalPrice * 100,
      currency: "INR",
      customer: {
        name: `${order.user.firstName} ${order.user.lastName}`,
        contact: order.user.mobile,
        email: order?.user?.email, // optional if not working remove it
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:3000/payment/${orderId}`,
      callback_method: "get",
    };

    console.log("paymentLinkRequest",paymentLinkRequest)

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;
    const resData = { paymentLinkId, payment_link_url };

    return resData;
  } catch (error) {
    throw new Error(error.message || "Failed to create payment link");
  }
};

const updatePaymentInformation = async (reqData) => {
  try {
    const paymentId = reqData.payment_id; // if not working try paymentId
    const orderId = reqData.order_id;

    const order = await orderService.findOrderById(orderId);

    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      // order.paymentDetails.paymentStatus = payment.status;
      order.paymentDetails.status = payment.status;
      order.orderStatus = "PLACED";

      await order.save();
    }

    const resData = {
      message: "Your order has been placed successfully",
      success: true,
    };

    return resData;
  } catch (error) {
    throw new Error(error.message || "Failed to create payment link");
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
