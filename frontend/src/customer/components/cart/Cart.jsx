import React from "react"; // { useEffect, useMemo }
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart } from "../../../state/cart/action";

const Cart = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const cart = useSelector((store) => store?.cart?.cart?.cart);
  // const store = useSelector((store) => store);
  // const cartItems = useMemo(
  //   () => store?.cart?.cart?.cart?.cartItems,
  //   [store?.cart?.cart?.cart?.cartItems]
  // );

  const handleCheckout = () => {
    navigate("/checkout?step=1");
  };

  // useEffect(() => {
  //   dispatch(getCart());
  // }, [cartItems?.length, dispatch]);

  // useEffect(() => {
  //   dispatch(getCart());
  // }, [
  //   cart?.updatedCartItem,
  //   cart?.deledCartItem,
  //   cart?.totalPrice,
  //   cart?.totalItems,
  //   dispatch,
  // ]);

  const cart = {
    totalPrice: 5000,
    totalDiscount: 100,
    totalDiscountedPrice: 4900,
    cartItems: [
      {
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
      },
    ],
  };

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {cart?.cartItems?.map((item, i) => (
            <>
              <CartItem key={i} item={item} />
              <CartItem key={i} item={item} />
              <CartItem key={i} item={item} />
            </>
          ))}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-4">
            <p className="uppercase font-bold opacity-60 pb-4">
              Payment Details
            </p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3">
                <span>Price</span>
                <span>₹{cart?.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-green-600">
                  -₹{cart?.totalDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery Charges</span>
                <span className="text-green-600">
                  {cart?.totalDiscountedPrice >= 499 ? "Free" : "+₹40.00"}
                </span>
              </div>
              <div className="w-full border-t flex justify-between items-center py-3 font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">
                  {cart?.totalDiscountedPrice < 499
                    ? (cart?.totalDiscountedPrice + 40).toFixed(2)
                    : cart?.totalDiscountedPrice.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
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
  );
};

export default Cart;
