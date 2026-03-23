import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState} from "react";
import { useSelector } from "react-redux";
import { doSignOut } from "../../features/auth/authService";
import NavLinks from "./NavLinks";
import CartButton from "../../features/cart/components/CartButton";
import AuthControlsDesktop from "../../features/auth/components/AuthControlsDesktop";
import SearchBar from "../../features/products/components/SearchBar";

export default function NavBar() {

  /**
   * Estado local para controlar menú mobile (hamburger)
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Usuario desde Redux (estado global)
   */
  const user = useSelector((state) => state.auth.user);

  /**
   * Maneja logout del usuario
   * - Llama al servicio de Firebase
   * - Cierra el menú mobile si está abierto
   */
  const handleLogout = async () => {
    try {
      await doSignOut();
      setIsOpen(false);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    /**
     * Navbar sticky (queda fija arriba)
     */
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      {/* Contenedor principal */}
      <div className="mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo / navegación a home */}
        <Link to="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[display] font-semibold text-[var(--color-primary)] hover:opacity-80 transition-opacity">
          MiTienda
        </Link>

        {/* Botón hamburguesa (solo mobile) */}
        <button 
          aria-label="Abrir menú" 
          aria-expanded={isOpen} 
          className="md:hidden p-2 text-[var(--color-primary)]" 
          onClick={() => setIsOpen(prev => !prev)}
          >
            {isOpen ? (
              <X className="w-6 h-6 hover:cursor-pointer" /> 
            ) : (
              <Menu className="w-6 h-6 hover:cursor-pointer" />
            )}
        </button>

        {/* Links de navegación (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Acciones (carrito, búsqueda, auth) */}
        <div className="flex items-center gap-4">

          {/* Carrito en mobile */}
          <div className="md:hidden">
            <CartButton />
          </div>

          {/* Buscador (solo desktop) */}
          <div className="hidden md:block max-w-[170px]">
            <SearchBar />
          </div>
          
          {/* Carrito en desktop (solo si hay usuario) */}
          {user && 
            <div className="hidden md:block">
              <CartButton />
            </div>
          }
          
          {/* Controles de autenticación */}
          <div className="hidden md:block">
            <AuthControlsDesktop user={user} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">

          {/* Menú mobile desplegable */}
          <div className="mb-3">
            <SearchBar 
              isMobile={true} 
              closeMenu={() => setIsOpen(false)} 
            />
          </div>

          {/* Links + autenticación */}
          <NavLinks 
            isMobile={true} 
            closeMenu={() => setIsOpen(false)} 
            user={user} 
            onLogout={handleLogout} 
          />
        </div>
      )}
    </nav>
  );
}
