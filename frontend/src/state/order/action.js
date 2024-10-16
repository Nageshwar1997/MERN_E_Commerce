import { api } from "../../config/api.config";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./actionType";

export const createOrder = (reqData) => async (dispatch) => {
  console.log("reqData", reqData);
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post(`/api/orders`, reqData.address);

    console.log("data",data)

    if (data?.order._id) {
      reqData.navigate({ search: `step=3&order_id=${data?.order._id}` });
    }
    console.log("Created Order:", data);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating order:", error);
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);

    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });

    // console.log("Fetched Order:", data);
  } catch (error) {
    console.error("Error fetching order:", error);
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};
