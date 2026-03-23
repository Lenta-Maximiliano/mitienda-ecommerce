import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/products/productsApi";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";

/** Configuración global del store de Redux.
 *
 * Responsabilidades:
 * - Registrar los reducers de cada feature (auth, cart)
 * - Integrar RTK Query para el manejo de datos remotos (productsApi)
 * - Extender el middleware por defecto con el middleware de RTK Query
 *
 */
export const store = configureStore({
  reducer: {
    // Estado de autenticación del usuario
    auth: authReducer,

    // Estado del carrito de compras
    cart: cartReducer,

    // Estado gestionado por RTK Query (cache, loading, errors)
    [productsApi.reducerPath]: productsApi.reducer,
  },

  /** Middleware del store.
   *
   * Se extiende el middleware por defecto para incluir:
   * - Middleware de RTK Query → necesario para caching, invalidación y refetch automático
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});