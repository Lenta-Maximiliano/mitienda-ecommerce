import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

export default function CartButton() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Link
      to="/checkout"
      className="relative p-2 rounded-full hover:bg-[var(--color-soft)] transition-colors"
      aria-label="Carrito"
    >
      <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
