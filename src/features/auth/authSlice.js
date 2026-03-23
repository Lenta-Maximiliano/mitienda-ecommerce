import { createSlice } from "@reduxjs/toolkit";

/** Estado inicial de autenticación
 *
 * user: contiene la información del usuario autenticado
 * isLoggedIn: indica si hay una sesión activa
 */
const initialState = {
  user: null,
  isLoggedIn: false,
};

/** authSlice
 *
 * Slice de Redux encargado de manejar la autenticación global.
 *
 * Responsabilidades:
 * - Guardar el usuario autenticado
 * - Indicar si hay sesión activa
 * - Limpiar datos al cerrar sesión
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    /** setUser
     *
     * Guarda los datos del usuario en el estado global
     * y marca la sesión como iniciada.
     *
     * @param {Object} action.payload - datos del usuario (uid, email, displayName)
     */
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    /** logout
     *
     * Limpia el estado de autenticación
     * (se usa al cerrar sesión)
     */
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

//Acciones generadas automáticamente por createSlice
export const { setUser, logout } = authSlice.actions;

// Reducer del slice (se conecta al store)
export default authSlice.reducer;