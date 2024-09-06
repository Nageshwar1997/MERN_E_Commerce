import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/account/order/${5}`)} className="p-5 shadow-lg border rounded-md hover:shadow-slate-200 hover:shadow-xl">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <div className="w-20 h-20">
              <img
                src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70"
                alt=""
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="ml-5 space-y-2">
              <p>Men Printed Pureotton Straight Kurta</p>
              <p className="opacity-60 text-xs font-semibold">Size: L</p>
              <p className="opacity-60 text-xs font-semibold">Color: Blue</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>₹1099</p>
        </Grid>
        <Grid item xs={4}>
          {true && (
            <div>
              <p className="flex items-center space-x-1">
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600"
                />
                <span>Expected Delivery on Mar 04</span>
              </p>
              <p className="text-xs">Your order has been delivered</p>
            </div>
          )}
          {false && (
            <p>
              <span>Expected Delivery on Mar 04</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
