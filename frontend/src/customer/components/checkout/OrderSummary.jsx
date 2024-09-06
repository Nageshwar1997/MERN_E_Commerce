import React from "react";
import AddressCard from "../addressCard/AddressCard";
import { Button } from "@mui/material";
import CartItem from "../cart/CartItem";

const OrderSummary = () => {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard />
      </div>
      <div>
        <div className="lg:grid grid-cols-3 my-4 rounded-s-md shadow-lg py-2 relative">
          <div className="col-span-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <CartItem />
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
                  <span>Rs. 199</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">Rs. 199</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="w-full border-t flex justify-between items-center py-3 font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">Rs. 1599</span>
                </div>
                <Button
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
