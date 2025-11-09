import { Link, useLocation } from "react-router-dom";
import AuthControls from "./AuthControls";

export default function NavLinks({ isMobile = false, closeMenu, user, onLogout }) {
  const location = useLocation();

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/products" },
    { name: "Checkout", path: "/checkout" },
  ];

  return (
    <ul className={`${isMobile ? "flex flex-col gap-3 p-4" : "flex items-center gap-8"} font-medium`}>
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <li key={link.path} className="p-1 rounded-md border-2 border-transparent hover:border-[var(--color-primary)] hover:cursor-pointer">
            <Link
              to={link.path}
              onClick={isMobile && closeMenu ? closeMenu : undefined}
              className={`transition-colors block ${isActive ? "text-[var(--color-accent)] font-bold" : "text-[var(--color-text)] hover:text-[var(--color-primary)]"}`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.name}
            </Link>
          </li>
        );
      })}

      {/* Auth controls for mobile */}
      {isMobile && <AuthControls user={user} isMobile={true} closeMenu={closeMenu} onLogout={onLogout} />}
    </ul>
  );
}
