import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/firebaseConfig";
import { setUser, logout } from "../store/authSlice";

/** useAuthListener
 *
 * Hook encargado de sincronizar el estado de autenticación
 * de Firebase con el estado global de Redux.
 *
 * Responsabilidades:
 * - Detectar cambios en la sesión del usuario (login / logout)
 * - Guardar usuario en Redux cuando está autenticado
 * - Limpiar estado cuando no hay usuario
 *
 */
export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /** Suscripción al listener de Firebase Auth
     *
     * Se ejecuta automáticamente cuando:
     * - el usuario inicia sesión
     * - el usuario cierra sesión
     * - Firebase restaura sesión persistida
     */
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {

      if (fbUser) {
        /** Usuario autenticado
         *
         * Normalizamos los datos que vamos a guardar en Redux
         * (evitamos depender directamente del objeto de Firebase)
         */
        const userData = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || "",
        };

        dispatch(setUser(userData));

      } else {
        // Usuario no autenticado (logout o sesión expirada)
        dispatch(logout());
      }
    });

    // Cleanup: Evita memory leaks al desmontar el componente
    return () => unsubscribe();

  }, [dispatch]);
}