import { NavLink } from "react-router-dom";
import AuthControlsMobile from "../../features/auth/components/AuthControlsMobile";

/**
 * NavLinks
 *
 * Componente de navegación principal.
 *
 * Responsabilidades:
 * - Renderizar links de navegación de forma dinámica
 * - Manejar estado activo mediante NavLink (React Router)
 * - Adaptarse a layout mobile / desktop
 * - Cerrar menú mobile al navegar
 * - Renderizar controles de autenticación en mobile
 *
 * @param {boolean} isMobile - Define si el layout es mobile
 * @param {Function} closeMenu - Callback para cerrar menú mobile
 * @param {Object|null} user - Usuario autenticado
 * @param {Function} onLogout - Handler de logout
 */
export default function NavLinks({ isMobile = false, closeMenu, user, onLogout }) {

  /**
   * Definición de links
   * Estructura escalable y mantenible
   */
  const links = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/products" },
    { name: "Checkout", path: "/checkout" },
  ];

  /**
   * Handler de navegación
   * - Solo ejecuta lógica en mobile
   */
  const handleClick = () => {
    if (isMobile) closeMenu?.();
  };

  return (
    <ul
      className={`
        ${isMobile
          ? "flex flex-col gap-3 p-4"
          : "flex items-center gap-8 mx-[15px]"
        }
        font-medium
      `}
    >
      {links.map((link) => (
        <li
          key={link.path}
          className="p-1 rounded-md border-2 border-transparent hover:border-[var(--color-primary)] hover:cursor-pointer transition-all duration-200"
        >
          <NavLink
            to={link.path}
            onClick={handleClick}

            /**
             * end:
             * - Evita que "/" esté activo en todas las rutas
             * - Solo aplica match exacto para la home
             */
            end={link.path === "/"}

            /**
             * className dinámico provisto por NavLink
             * Recibe { isActive } automáticamente
             */
            className={({ isActive }) => `
              block transition-colors
              ${isActive
                ? "text-[var(--color-accent)] font-bold"
                : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
              }
            `}
          >
            {link.name}
          </NavLink>
        </li>
      ))}

      {/* 
        Controles de autenticación (solo mobile)
        En desktop se manejan desde NavBar
      */}
      {isMobile && (
        <AuthControlsMobile
          user={user}
          closeMenu={closeMenu}
          onLogout={onLogout}
        />
      )}
    </ul>
  );
}
