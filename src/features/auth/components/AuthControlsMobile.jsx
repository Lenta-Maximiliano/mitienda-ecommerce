import { NavLink } from "react-router-dom";

/** AuthControlsMobile
 *
 * Componente de autenticación para mobile (menú desplegable).
 *
 * Responsabilidades:
 * - Renderizar opciones de auth dentro del menú mobile
 * - Cerrar menú al navegar
 * - Ejecutar logout correctamente
 *
 * Importante:
 * - NO maneja estado interno (es totalmente controlado por el padre)
 * - NO define <ul>, solo devuelve elementos de lista (<li>)
 *
 * @param {Object|null} user - Usuario autenticado
 * @param {Function} closeMenu - Callback para cerrar menú mobile
 * @param {Function} onLogout - Handler de logout
 */
export default function AuthControlsMobile({ user, closeMenu, onLogout }) {
  
  // Usuario NO autenticado
  if (!user) {
    return (
      <li>
        <NavLink
          to="/auth/login"
          onClick={() => closeMenu?.()}
          className="block bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-center border-2 hover:border-[var(--color-primary)] hover:bg-white hover:text-[var(--color-primary)]"
        >
          Iniciar sesión
        </NavLink>
      </li>
    );
  }

  // Usuario autenticado
  return (
    <>
      <li>
        <NavLink
          to="/profile"
          onClick={() => closeMenu?.()}
          className="block px-4 py-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-gray-50"
        >
          Mi Perfil
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/orders"
          onClick={() => closeMenu?.()}
          className="block px-4 py-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-gray-50"
        >
          Mis Pedidos
        </NavLink>
      </li>

      <li>
        <button
          onClick={() => {
            closeMenu?.();
            onLogout?.();
          }}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 hover:cursor-pointer"
        >
          Cerrar sesión
        </button>
      </li>
    </>
  );
}