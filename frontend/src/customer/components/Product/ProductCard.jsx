import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="w-[15rem] group p-2 mx-3 transition-all cursor-pointer rounded border shadow-md hover:shadow-lg hover:shadow-slate-400"
    >
      <div className="h-[20rem]">
        <img
          src={product?.imageUrl}
          alt={product?.title}
          className="w-full h-full object-cover object-left-top rounded"
        />
      </div>
      <div className="bg-white p-3 transition-transform duration-300 ease-out group-hover:translate-y-[-10px]">
        <div>
          <p className="font-bold opacity-60 uppercase">{product?.brand}</p>
          <p className="line-clamp-2">{product?.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">{"₹" + product?.discountedPrice}</p>
          <p className="line-through opacity-50">{"₹" + product?.price}</p>
          <p className="text-green-600 font-semibold">
            {product?.discountPersent + "% OFF"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
