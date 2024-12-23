import React from "react";
import AddressCard from "../addressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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

const OrderDetails = () => {
  return (
    <div className="px-5 mb-8 lg:px-20">
      <div>
        <h1 className="font-bold text-xl py-5">Delivery Address</h1>
        <AddressCard address={address} />
      </div>
      <div className="py-14">
        <OrderTracker activeStep={3} />
      </div>
      <Grid container className="space-y-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid
            key={index}
            item
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center">
                <div className="w-24 h-24 border p-1 rounded">
                  <img
                    src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2 ml-5">
                  <p className="font-semibold">
                    Men Printed Pureotton Straight Kurta
                  </p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Color: Blue</span>
                    <span>Size: L</span>
                  </p>
                  <p>Seller: Fubar</p>
                  <p>Price: ₹1099</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <Box
                sx={{ color: deepPurple[500] }}
                className="flex items-center gap-1"
              >
                <StarBorderIcon fontSize="small" />
                <span>Rate & Review</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
