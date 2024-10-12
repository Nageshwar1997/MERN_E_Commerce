const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_QeJfd7uoPhbp6b",
  key_secret: "bXyfOkAbhsbPXzcr7AXCscTz",
});

module.exports = { razorpay };
