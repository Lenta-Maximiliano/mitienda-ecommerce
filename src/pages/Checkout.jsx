import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/store/cartSlice";

/**
 * Checkout
 *
 * Página de checkout (carrito).
 *
 * Responsabilidades:
 * - Mostrar productos agregados al carrito
 * - Permitir modificar cantidades
 * - Eliminar productos
 * - Mostrar resumen de compra (total)
 * - Permitir vaciar carrito
 */
export default function Checkout() {

  // Obtenemos datos del carrito desde Redux
  const { items, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      {/* Estado vacío */}
      {items.length === 0 ? (
        <p className="text-lg text-[var(--color-muted)]">
          Tu carrito está vacío 🛒
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* LISTADO DE PRODUCTOS */}
          <div className="min-w-[300px] mx-auto lg:col-span-2 space-y-4 md:w-3/4 lg:w-4/4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                {/* Imagen */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-28 h-28 object-contain rounded-md mb-4 sm:mb-0 sm:mr-6"
                />

                {/* Info + acciones */}
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Datos del producto */}
                  <div>
                    <h3 className="text-md sm:text-xl font-semibold text-[var(--color-primary)]">
                      {item.title}
                    </h3>

                    <p className="text-[var(--color-muted)] mt-1 text-sm sm:text-base">
                      Precio unitario: ${item.price.toFixed(2)}
                    </p>

                    <p className="text-[var(--color-accent)] font-bold mt-1 text-sm sm:text-base">
                      Total: ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 mx-auto">
                    
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 transition hover:cursor-pointer"
                    >
                      -
                    </button>

                    <span className="text-base sm:text-lg font-medium">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 transition hover:cursor-pointer"
                    >
                      +
                    </button>
                    
                    {/* Eliminar producto */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-2 sm:ml-4 bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-lg font-semibold hover:bg-red-200 transition text-sm sm:text-base hover:cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className="w-[300px] max-w-[370px] h-[300px] mx-auto bg-white p-4 md:p-6 rounded-2xl shadow-md lg:sticky top-30">
            
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-4">
              Resumen
            </h2>
            
            <div className="flex justify-between text-base md:text-lg text-[var(--color-muted)] mb-2">
              <span>Productos:</span>
              <span>{items.length}</span>
            </div>
            
            <div className="flex justify-between text-base md:text-lg font-semibold text-[var(--color-accent)] mb-6">
              <span>Total a pagar:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Acción principal (checkout real en el futuro) */}
            <button className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition mb-3 text-sm md:text-base hover:cursor-pointer">
              Confirmar compra
            </button>
            
            {/* Vaciar carrito */}
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition text-sm md:text-base hover:cursor-pointer"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}