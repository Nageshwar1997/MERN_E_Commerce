import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Footer from "./customer/components/footer/Footer";
import Navigation from "./customer/components/navigation/Navigation";
// import HomePage from "./customer/pages/HomePage/HomePage";
// import Product from "./customer/components/product/Product";
import ProductDetails from "./customer/components/productDetails/ProductDetails";

function App() {
  return (
    <Router>
      <Navigation />
      <div>
        {/* <HomePage /> */}
        {/* <Product /> */}
        <ProductDetails />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
