import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const OrderTracker = ({ activeStep }) => {
  const steps = [
    "Placed",
    "Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
  ];
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
