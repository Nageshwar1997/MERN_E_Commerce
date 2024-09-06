import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
const CartItem = () => {
  return (
    <div className="p-5 shadow-md border rounded-md">
      <div className="flex items-center">
        <div className="w-20 h-20 lg:w-36 lg:h-36">
          <img
            src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">
            Men Printed Pure Cotton Straight Kurta
          </p>
          <p className="opacity-70">Size: L, White</p>
          <p className="opacity-70 mt-2">Seller: Majestic Man</p>
          <div className="flex space-x-5 items-center text-gray-900 mt-2">
            <p className="font-semibold">Rs. 199</p>
            <p className="font-semibold line-through opacity-50">Rs. 299</p>
            <p className="text-green-600 font-semibold">50% OFF</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton>
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">03</span>
          <IconButton sx={{ color: "RGB(145 85 253)" }}>
            <ControlPointOutlinedIcon />
          </IconButton>
        </div>
        <div>
          <Button sx={{ color: "RGB(145 85 253)" }}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
