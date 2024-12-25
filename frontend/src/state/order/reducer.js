import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./actionType";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  success: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        success:true,
        error: null,
      };

    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        success: true,
        error: null,
      };

    case CREATE_ORDER_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
