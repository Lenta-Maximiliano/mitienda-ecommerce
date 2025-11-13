import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { doSignOut } from "../services/authService";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import AuthControls from "./AuthControls";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await doSignOut();
      setIsOpen(false);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[display] font-semibold text-[var(--color-primary)] hover:opacity-80 transition-opacity">
          MiTienda
        </Link>

        {/* Mobile hamburger */}
        <button aria-label="Abrir menú" aria-expanded={isOpen} className="md:hidden p-2 text-[var(--color-primary)]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 hover:cursor-pointer" /> : <Menu className="w-6 h-6 hover:cursor-pointer" />}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks user={user} />
        </div>

        {/* Cart + Auth (desktop) */}
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <CartButton />
          </div>
          {user && <div className="hidden md:block"><CartButton /></div>}
          <div className="hidden md:block">
            <AuthControls user={user} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <NavLinks isMobile={true} closeMenu={() => setIsOpen(false)} user={user} onLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
}
