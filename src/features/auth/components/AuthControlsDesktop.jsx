import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";

/** AuthControlsDesktop
 *
 * Componente de autenticación para desktop.
 *
 * Responsabilidades:
 * - Mostrar botón de login si no hay usuario
 * - Mostrar dropdown con opciones si el usuario está autenticado
 * - Manejar apertura/cierre del dropdown
 * - Cerrar dropdown al hacer click fuera
 *
 * @param {Object|null} user - Usuario autenticado
 * @param {Function} onLogout - Handler de logout
 */
export default function AuthControlsDesktop({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  // Ref para detectar clicks fuera del dropdown
  const containerRef = useRef(null);

  // Efecto: cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Si no hay usuario → mostrar botón de login
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <NavLink
          to="/auth/login"
          className="text-sm font-medium px-4 py-2 rounded-md transition bg-[var(--color-primary)] text-white hover:opacity-90"
        >
          Iniciar sesión
        </NavLink>
      </div>
    );
  }

  // Usuario autenticado → dropdown
  return (
    <div ref={containerRef} className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 hover:bg-[var(--color-soft)] px-3 py-2 rounded-md transition hover:cursor-pointer"
        aria-expanded={open}
      >
        <User className="w-5 h-5 text-[var(--color-primary)]" />
        <span className="text-sm font-medium">{user.email}</span>

        <ChevronDown
          className={`w-4 h-4 text-[var(--color-primary)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Mi Perfil
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Mis Pedidos
          </NavLink>

          <button
            onClick={() => {
              setOpen(false);
              onLogout?.();
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 hover:cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}