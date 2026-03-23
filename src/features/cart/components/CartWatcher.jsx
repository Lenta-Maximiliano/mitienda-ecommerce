import { useEffect, useRef  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistCart, fetchCart, clearCart } from "../cartSlice";
import { deleteCart } from "../cartService";

/** CartWatcher
 *
 * Componente "invisible" encargado de sincronizar el carrito
 * entre el estado global (Redux) y el backend (Firebase).
 *
 * Responsabilidades:
 * - Cargar carrito al iniciar sesión
 * - Limpiar carrito al cerrar sesión
 * - Persistir cambios del carrito en backend
 *
 * No renderiza UI → solo maneja efectos secundarios
 */
export default function CartWatcher() {
  const dispatch = useDispatch();

  // Usuario autenticado desde Redux
  const user = useSelector((state) => state.auth.user);
  
  // Items del carrito
  const cart = useSelector((state) => state.cart.items);

  /** Flag para evitar persistir antes de haber cargado el carrito
   *
   * useRef:
   * - persiste entre renders
   * - NO dispara re-render
   */
  const hasFetched = useRef(false);



  // EFECTO 2: Persistir carrito cuando cambia
  useEffect(() => {

    /** Condiciones para persistir:
     * - usuario logueado
     * - carrito ya fue cargado (evita overwrite inicial)
     */
    if (user?.uid && hasFetched.current) {

      if (cart.length > 0) {

        //Guardar carrito en backend
        dispatch(persistCart({ userId: user.uid, items: cart }));
      } else {
        
        // Si el carrito está vacío → eliminar en backend
        deleteCart(user.uid);
      }
    }
  }, [cart, user, dispatch]);

  return null; // no renderiza nada en pantalla
}

