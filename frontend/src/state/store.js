import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { customerProductReducer } from "./product/reducer";
import { cartReducer } from "./cart/reducer";
import { orderReducer } from "./order/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
