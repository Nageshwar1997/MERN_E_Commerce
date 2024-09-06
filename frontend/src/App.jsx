import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./customer/components/footer/Footer";
import Navigation from "./customer/components/navigation/Navigation";
// import HomePage from "./customer/pages/HomePage/HomePage";
// import Product from "./customer/components/product/Product";
// import ProductDetails from "./customer/components/productDetails/ProductDetails";
// import Cart from "./customer/components/cart/Cart"
// import Checkout from "./customer/components/checkout/Checkout";
import Order from "./customer/components/order/Order";
import OrderDetails from "./customer/components/order/OrderDetails";
import CustomerRoutes from "./customer/routes/CustomerRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>

      {/* <div> */}
      {/* <HomePage /> */}
      {/* <Product /> */}
      {/* <ProductDetails /> */}
      {/* <Cart/> */}
      {/* <Checkout/> */}
      {/* <Order/> */}
      {/* <OrderDetails /> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
