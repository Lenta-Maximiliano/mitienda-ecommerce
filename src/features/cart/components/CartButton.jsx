import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

/** CartButton
 *
 * Botón de acceso al carrito de compras.
 *
 * Responsabilidades:
 * - Mostrar el ícono de carrito
 * - Indicar la cantidad total de productos (badge)
 * - Redirigir dinámicamente según estado de autenticación
 *
 * Comportamiento:
 * - Si el usuario está autenticado → navega a /checkout
 * - Si NO está autenticado → navega a /auth/login
 *
 * Estado global utilizado (Redux):
 * - cart.totalQuantity → cantidad total de productos en el carrito
 * - auth.user → usuario autenticado
 */
export default function CartButton() {
  // Selecciona la cantidad total de productos en el carrito desde el estado global (Redux).
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Obtiene el usuario autenticado. Se utiliza para decidir la redirección.
  const user = useSelector((state) => state.auth.user);

  return (
    <Link
      to={user ? "/checkout" : "/auth/login"}
      className="relative p-2 rounded-full"
      aria-label="Carrito"
    >
      {/* Ícono del carrito */}
      <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" />

      {/* 
        Badge de cantidad:
        - Solo se renderiza si hay productos en el carrito
        - Evita mostrar "0" innecesariamente
      */}
      {totalQuantity > 0 && (
        <span className="absolute top-4 -right-5 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
