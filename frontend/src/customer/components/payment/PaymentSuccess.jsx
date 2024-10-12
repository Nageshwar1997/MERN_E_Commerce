import React, { useEffect, useState } from "react";

import { Alert, AlertTitle, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OrderTracker from "../order/OrderTracker";
import AddressCard from "../addressCard/AddressCard";
import { getOrderById } from "../../../state/order/action";
import { updatePayment } from "../../../state/payment/action";
import { api } from "../../../config/api.config";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const order = useSelector((store) => store);
  console.log("order", order);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId) {
      const data = {
        paymentId,
        orderId,
      };
      dispatch(getOrderById(orderId));
      dispatch(updatePayment(data));
    }
  }, [paymentId, orderId]);

  useEffect(async () => {
    // Hardcoding the values for testing
    const testPaymentId = "pay_P8CEbtDYd0DnMP";
    const testOrderId = "670aa6cc3f77202df51023ca";

    try {
      const { data } = await api.get(
        `/api/payments?payment_id=${testPaymentId}&order_id=${testOrderId}`
      );
      console.log("Test updatePaymentData", data);
      //   dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
      console.error(
        "Error during test updatePayment:",
        error.response || error
      );
      //   dispatch({
      //     type: UPDATE_PAYMENT_FAILURE,
      //     payload: error.response?.data?.message || error.message,
      //   });
    }
  }, []);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Successful</AlertTitle>
          Your payment has been successfully processed and order has been
          placed.
        </Alert>
      </div>

      <OrderTracker activeStep={1} />

      <Grid container className="space-y-5 py-5 pt-20">
        {order?.orderItems?.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  className="w-20 h-20 object-cover object-top"
                  src={""}
                  alt={""}
                />
                <div className="ml-5 space-y-2">
                  <p>title</p>
                  <div className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color : {""}</span>
                    <span>Size : {""}</span>
                  </div>
                  <p>Seller : {""}</p>
                  <p>Price : {""}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCard address={""} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
