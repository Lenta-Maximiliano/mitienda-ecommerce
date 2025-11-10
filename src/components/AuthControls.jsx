import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";

export default function AuthControls({ user, onLogout, isMobile = false, closeMenu }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Variantes de estilo
  const authBtnClass = "text-sm font-medium px-4 py-2 rounded-md transition";
  const loginClass = "bg-[var(--color-primary)] text-white " + authBtnClass;
  const registerClass = "text-[var(--color-primary)] " + authBtnClass + " hover:underline underline-offset-4";

  // Mobile
  if (isMobile) {
    if (!user) {
      return (
        <>
          <li>
            <Link to="/auth/login" onClick={() => closeMenu?.()} className="block bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-center border-2 hover:border-[var(--color-primary)] hover:bg-white hover:text-[var(--color-primary)]">
              Iniciar sesión
            </Link>
          </li>
          <li>
            <Link to="/auth/register" onClick={() => closeMenu?.()} className="block text-[var(--color-primary)] px-4 py-2 text-center border-2 border-transparent rounded-md hover:underline hover:border-[var(--color-primary)]">
              Crear mi Cuenta
            </Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          <Link to="/profile" onClick={() => closeMenu?.()} className="block px-4 py-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-gray-50">
            Mi Perfil
          </Link> 
        </li>
        <li>
          <Link to="/orders" onClick={() => closeMenu?.()} className="block px-4 py-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-gray-50">
            Mis Pedidos
          </Link>
        </li>
        <li>
          <button onClick={() => { closeMenu?.(); onLogout?.(); }} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 hover:cursor-pointer">
            Cerrar sesión
          </button>
        </li>
      </>
    );
  }

  // Desktop
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/auth/login" className={loginClass}>
          Iniciar sesión
        </Link>
        <Link to="/auth/register" className={registerClass}>
          Crear mi Cuenta
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 hover:bg-[var(--color-soft)] px-3 py-2 rounded-md transition hover:cursor-pointer"
        aria-expanded={dropdownOpen}
      >
        <User className="w-5 h-5 text-[var(--color-primary)]" />
        <span className="text-sm font-medium">{user.email}</span>
        <ChevronDown className={`w-4 h-4 text-[var(--color-primary)] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
          <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Mi Perfil
          </Link>
          <Link to="/orders" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Mis Pedidos
          </Link>
          <button onClick={() => { setDropdownOpen(false); onLogout?.(); }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 hover:cursor-pointer">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
