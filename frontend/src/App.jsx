import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/Home/HomePage";
import LoginPage from "../src/pages/Login/LoginPage";
import RegisterPage from "../src/pages/Register/RegisterPage";
// import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/CartPage";
// import DashboardAdmin from "./pages/admin/DashboardAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

