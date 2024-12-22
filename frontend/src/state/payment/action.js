import { api } from "../../config/api.config";
import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./actionType";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/payments/${orderId}`, {});
    console.log("paymentLinkData", data);

    if (data?.paymentLink?.paymentLinkUrl) {
      window.location.href = data?.paymentLink?.paymentLinkUrl;
    }

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating payment:", error);
    dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  console.log("reqData", reqData);
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.get(
      `/api/payments?payment_id=${reqData?.paymentId}&order_id=${reqData?.orderId}`
    );
    console.log("updatePaymentData", data);

    if (data) {
      dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    } else {
      console.error("No data received from the API");
    }
  } catch (error) {
    console.error("Error updating payment:", error);
    dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message });
  }
};
