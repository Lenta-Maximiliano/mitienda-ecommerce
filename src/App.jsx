import { Routes, Route } from "react-router-dom";
import AuthListener from "./features/auth/components/AuthListener";
import NavBar from "./components/layout/NavBar";
import CartWatcher from "./features/cart/components/CartWatcher"; 
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="min-w-[350px] max-w-[1000px] mx-auto min-h-screen flex flex-col">
      <AuthListener />
      <NavBar />
      <CartWatcher />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route  path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}