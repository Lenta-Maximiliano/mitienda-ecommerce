import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CartWatcher from "./components/CartWatcher"; 
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <div className="min-w-[350px] max-w-[1000px] mx-auto">
      <NavBar />
      <CartWatcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}