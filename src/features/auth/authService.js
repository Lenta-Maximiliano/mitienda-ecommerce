import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/** register
 *
 * Registra un nuevo usuario en Firebase Authentication
 *
 * @param {string} email - email del usuario
 * @param {string} password - contraseña
 * @returns {Promise<Object>} usuario autenticado
 */
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // userCredential contiene info completa (user, metadata, etc)
    return userCredential.user;

  } catch (error) {
    console.error("Error en registro:", error);
    throw error; // importante para que el componente lo maneje. Permite manejar errores en UI
  }
};

/** login
 *
 * Inicia sesión con email y contraseña
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} usuario autenticado
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;

  } catch (error) {
    console.error("Error en login:", error);
    throw error; 
  }
};

/** doSignOut
 *
 * Cierra la sesión del usuario actual
 */
export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};