import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    // product?._id field update karni hai
    <div onClick={() => navigate(`/product/${product?._id || 5}`)} className="w-[16rem] group p-2 mx-3 transition-all cursor-pointer rounded border shadow-md hover:shadow-lg hover:shadow-slate-400">
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
          <p className="font-semibold">{"₹" + product?.sellingPrice}</p>
          <p className="line-through opacity-50">
            {"₹" + product?.originalPrice}
          </p>
          <p className="text-green-600 font-semibold">
            {product?.discount + "% OFF"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
