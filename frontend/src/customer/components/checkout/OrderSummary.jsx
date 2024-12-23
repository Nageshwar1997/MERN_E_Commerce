import React, { useEffect } from "react";
// import AddressCard from "../addressCard/AddressCard";
import { Button } from "@mui/material";
import CartItem from "../cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
// import { getOrderById } from "../../../state/order/action";
import { useLocation, useNavigate } from "react-router-dom";
import AddressCard from "../addressCard/AddressCard";
// import { createPayment } from "../../../state/payment/action";

const cart = {
  totalPrice: 5000,
  totalDiscount: 100,
  totalDiscountedPrice: 4900,

  quantity: 5,
  size: "M",
  price: 500,
  discount: 10,
  product: {
    imageUrl:
      "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70",
    brand: "Majestic Man",
    title: "Men Printed Pure Cotton Straight Kurta",
    color: "Green",
    discountedPrice: 499,
    price: 1499,
    discountPersent: 66,
    size: [
      {
        name: "S",
        quantity: 20,
      },
      {
        name: "M",
        quantity: 30,
      },
      {
        name: "L",
        quantity: 50,
      },
    ],
    quantity: 100,
    topLavelCategory: "Men",
    secondLavelCategory: "Clothing",
    thirdLavelCategory: "mens_kurta",
    description:
      "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style.",
  },
};

const address = {
  firstName: "Nageshwar",
  lastName: "Pawar",
  address: "Amdura",
  city: "Nanded",
  state: "Maharashtra",
  zip: "431806",
  country: "India",
  mobileNumber: "+919503198637",
  alternateMobileNumber: "+919730870409",
};

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  // const order = useSelector((store) => store?.order?.order?.order);

  const orderId = searchParams.get("order_id");

  // console.log("order", order);

  const handleCheckout = () => {
    // dispatch(createPayment(orderId))
  };

  // useEffect(() => {
  //   dispatch(getOrderById(orderId));
  // }, [orderId, dispatch, order?.totalItems]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        {/* <AddressCard address={order?.shippingAddress} /> */}
        <AddressCard address={address} />
      </div>
      <div>
        <div className="lg:grid grid-cols-3 my-4 rounded-s-md shadow-lg py-2 relative">
          <div className="col-span-2">
            {/* {order?.orderItems?.map((item) => (
              <CartItem key={item.id:} item={item} />
              ))} */}
            <CartItem item={cart} />
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
                      {/* ₹ {order?.totalPrice * order?.totalItems} */} 1000
                    </span>
                    <span className="text-green-600">
                      {/* ₹ {order?.totalDiscountedPrice * order?.totalItems} */}{" "}
                      10
                    </span>
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">
                    {/* ₹ -{order?.totalDiscount * order?.totalItems} */} 500
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">
                    {/* {order?.totalDiscountedPrice > 499 ? "Free" : "₹ 40"} */}{" "}
                    Free
                  </span>
                </div>
                <div className="w-full border-t flex justify-between items-center py-3 font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">
                    ₹{" "}
                    {/* {order?.totalDiscountedPrice * order?.totalItems > 499
                      ? order?.totalDiscountedPrice * order?.totalItems
                      : order?.totalDiscountedPrice * order?.totalItems + 40} */}{" "}
                    499
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
