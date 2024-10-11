import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../state/cart/action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Handle quantity update
  const handleUpdateCartItem = (num) => {
    if (item.quantity + num > 0) {
      const data = {
        data: { quantity: item.quantity + num },
        cartItemId: item._id,
      };
      dispatch(updateCartItem(data));
    }
  };

  // Handle item removal
  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  return (
    <div className="p-5 shadow-md border rounded-md">
      <div className="flex items-center">
        <div className="w-20 h-20 lg:w-36 lg:h-36">
          <img
            src={item?.product?.imageUrl}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">
            Size: {item?.size}, {item?.product?.color}
          </p>
          <p className="opacity-70 mt-2">
            Seller: <span className="uppercase">{item?.product?.brand}</span>
          </p>
          <div className="flex space-x-5 items-center text-gray-900 mt-2">
            <p className="font-semibold">₹{item?.discountedPrice}</p>
            <p className="font-semibold line-through opacity-50">
              ₹{item?.price}
            </p>
            <p className="text-green-600 font-semibold">
              {item?.discount}% OFF
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item?.quantity === 0}
          >
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            sx={{ color: "RGB(145 85 253)" }}
          >
            <ControlPointOutlinedIcon />
          </IconButton>
        </div>
        <div>
          <Button
            onClick={handleRemoveCartItem}
            sx={{ color: "RGB(145 85 253)" }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
