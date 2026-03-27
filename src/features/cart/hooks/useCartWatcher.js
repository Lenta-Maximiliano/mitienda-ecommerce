import { useEffect, useRef  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistCart, fetchCart, clearCart } from "../store/cartSlice";
import { deleteCart } from "../services/cartService";

/** useCartWatcher
 *
 * Responsabilidades:
 * - Cargar carrito al iniciar sesión
 * - Limpiar carrito al cerrar sesión
 * - Persistir cambios del carrito en backend
 */
export const useCartWatcher = () => {
  const dispatch = useDispatch();

  // Usuario autenticado desde Redux
  const user = useSelector((state) => state.auth.user);
  
  // Items del carrito
  const cart = useSelector((state) => state.cart.items);

  /** Flag para evitar persistir antes de haber cargado el carrito
   * ( useRef: persiste entre renders y NO dispara re-render
   */
  const hasFetched = useRef(false);

  // EFECTO 1: Cargar carrito cuando cambia el usuario
  useEffect(() => {
    if (!user) {

      // Logout → limpiar carrito
      dispatch(clearCart());
      
      hasFetched.current = false;
      return;
    }

    // Login → traer carrito desde backend
    dispatch(fetchCart(user.uid))
      .unwrap()
      .then(() => {
        hasFetched.current = true;
      })
      .catch((err) => {
        console.error("Error al cargar carrito:", err);
      });

  }, [user, dispatch]);

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
}

