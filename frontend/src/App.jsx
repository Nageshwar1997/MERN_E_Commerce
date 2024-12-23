import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
