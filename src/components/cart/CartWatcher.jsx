import { useEffect, useRef  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistCart, fetchCart, clearCart } from "../../features/cart/cartSlice";
import { deleteCart } from "../../services/cartService";

export default function CartWatcher() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.items);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!user) {
      dispatch(clearCart());
      console.log("Carrito limpiado por logout");
      hasFetched.current = false;
      return;
    }

    // Cargar carrito del usuario desde firebase, pasando por redux
    dispatch(fetchCart(user.uid))
      .unwrap() //Sin unwrap(), dispatch(fetchCart()) no te deja hacer .then(), porque devuelve un action de Redux, no una promesa.
      .then(() => {
        hasFetched.current = true;
      })
      .catch((err) => console.error("Error al cargar carrito:", err));
  }, [user, dispatch]); //dispatch → no cambia, pero React recomienda incluirlo por convención cuando lo usás dentro del efecto.

  // Persistir carrito en firebase, solo después de cargarlo, pasando por redux
  useEffect(() => {
    if (user?.uid && hasFetched.current) {
      if (cart.length > 0) {
        dispatch(persistCart({ userId: user.uid, items: cart }));
      } else {
        deleteCart(user.uid); // eliminar carrito vacío
      }
    }
  }, [cart, user, dispatch]);

  return null; // no renderiza nada en pantalla
}

