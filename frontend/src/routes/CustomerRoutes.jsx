import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../customer/pages/HomePage/HomePage";
import Cart from "../customer/components/cart/Cart";
import Navigation from "../customer/components/Navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/checkout/Checkout";
import Order from "../customer/components/order/Order";
import OrderDetails from "../customer/components/order/OrderDetails";

const CustomerRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <div className="">
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
      </Routes>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRoutes;
