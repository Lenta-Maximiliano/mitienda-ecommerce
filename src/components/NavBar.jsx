import { Link} from "react-router-dom";
import { ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import NavLinks from "./NavLinks";

export default function NavBar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Cerrar sesión");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[display] font-semibold text-[var(--color-primary)] hover:opacity-80 transition-opacity"
        >
          MiTienda
        </Link>

        {/* Botón menú (solo mobile) */}
        <button
          className="md:hidden p-2 text-[var(--color-primary)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Links desktop */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>

        {/* Login / Usuario + Carrito */}
        <div className="flex items-center gap-4">
          {/* Carrito */}
          <Link
            to="/checkout"
            className="relative p-2 rounded-full hover:bg-[var(--color-soft)] transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Usuario */}
          {!user ? (
            <Link
              to="/"
              className="bg-[var(--color-primary)] text-white text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 transition"
            >
              Iniciar sesión
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-[var(--color-soft)] px-3 py-2 rounded-md transition"
              >
                <User className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="text-sm font-medium">{user.email}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--color-primary)] transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Mis Pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Menú desplegable mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <NavLinks isMobile={true} closeMenu={() => setIsOpen(false)} />
        </div>
      )}
    </nav>
  );
}