import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Cart from "../components/cart/Cart";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import Product from "../components/product/Product";
import ProductDetails from "../components/productDetails/ProductDetails";
import Checkout from "../components/checkout/Checkout";
import Order from "../components/order/Order";
import OrderDetails from "../components/order/OrderDetails";
import PaymentSuccess from "../components/payment/PaymentSuccess";
const CustomerRoutes = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/payment/:orderId" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
