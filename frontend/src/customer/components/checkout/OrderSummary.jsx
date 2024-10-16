import React, { useEffect } from "react";
import AddressCard from "../addressCard/AddressCard";
import { Button } from "@mui/material";
import CartItem from "../cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../state/order/action";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment } from "../../../state/payment/action";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const order = useSelector((store) => store?.order?.order?.order);

  const orderId = searchParams.get("order_id");

  console.log("order", order);

  const handleCheckout = ()=>{
    dispatch(createPayment(orderId))
  }

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch, order?.totalItems]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={order?.shippingAddress} />
      </div>
      <div>
        <div className="lg:grid grid-cols-3 my-4 rounded-s-md shadow-lg py-2 relative">
          <div className="col-span-2">
            {order?.orderItems?.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-4">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price Details
              </p>
              <hr />
              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3">
                  <span>Price</span>
                  <span className="space-x-2">
                    <span className="text-red-600 line-through">
                      ₹ {order?.totalPrice * order?.totalItems}
                    </span>
                    <span className="text-green-600">
                      ₹ {order?.totalDiscountedPrice * order?.totalItems}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">
                    ₹ -{order?.totalDiscount * order?.totalItems}
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">
                    {order?.totalDiscountedPrice > 499 ? "Free" : "₹ 40"}
                  </span>
                </div>
                <div className="w-full border-t flex justify-between items-center py-3 font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">
                    ₹{" "}
                    {order?.totalDiscountedPrice * order?.totalItems > 499
                      ? order?.totalDiscountedPrice * order?.totalItems
                      : order?.totalDiscountedPrice * order?.totalItems + 40}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  type="submit"
                  variant="contained"
                  className="w-full"
                  sx={{
                    py: "1rem",
                    my: "1rem",
                    bgcolor: "#9155fd",
                    "&:hover": { bgcolor: "#7a42f5" },
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
