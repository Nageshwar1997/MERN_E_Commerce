import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/Navigation/Navigation";
import HomePage from "./customer/pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import Cart from "./customer/components/cart/Cart";
import Checkout from "./customer/components/checkout/Checkout";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
