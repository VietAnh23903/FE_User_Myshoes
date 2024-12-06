
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar1";
import Banner from "./components/Banner1";
import ProductList from "./components/ProductList1";
import Ads from "./components/Ads";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./userComponents/LoginForm";
import EditUser from "./userComponents/EditUser";
import RegisterForm from "./userComponents/RegisterForm";
import UserInformation from "./userComponents/UserInformation";
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import ProductDetail from './components/ProductDetail'; // Import ProductDetail
import SearchResult from "./components/SearchResult";
import OrderTracking from "./components/OrderTracking";

function App() {
  return (
    <Router>
    <CartProvider> {/* Bao bọc toàn bộ ứng dụng trong CartProvider */}
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<><Banner /><Ads /><ProductList /></>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user-info" element={<UserInformation />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
        </Routes>
      </div>
    </CartProvider>
  </Router>
  );
}

export default App;
