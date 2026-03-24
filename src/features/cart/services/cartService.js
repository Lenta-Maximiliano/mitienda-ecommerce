import { db } from "../../../firebase/firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp  } from "firebase/firestore";

/** Guarda o actualiza el carrito de un usuario en Firestore
 *
 * @param {string} userId - ID del usuario
 * @param {Array} cartItems - Lista de productos del carrito
 */
export const saveCart = async (userId, cartItems) => {

  // Validación básica
  if (!userId) {
    console.error("UID de usuario no válido en saveCart");
    return;
  }

  const cartRef = doc(db, "carts", userId);

  try {
    /**
     * Si hay items → guardar/actualizar documento
     * Si no hay items → eliminar carrito
     */
    if(cartItems.length > 0){

      await setDoc(cartRef, {
        items: cartItems,
        updatedAt: serverTimestamp()
      });
      console.log("✅ Carrito guardado/actualizado en Firebase");
    }
    else{
      await deleteDoc(cartRef);
      console.log("🗑️ Carrito vacío eliminado de Firebase");
    }
  } catch (error) {

    /** Manejo de errores
     * (no se relanza → solo log)
     */
    console.error("Error al guardar carrito:", error);
    throw error;
  }
};

/** Obtiene el carrito de un usuario desde Firestore
 *
 * @param {string} userId
 * @returns {Object} { items: [] }
 */
export const getCart = async (userId) => {

  if (!userId) {
    console.error("UID de usuario no válido en getCart");
    return { items: [] };
  }

  try {
    const docRef = doc(db, "carts", userId);
    const docSnap = await getDoc(docRef);

    /**
     * Si el documento existe → devolver items
     * Si no existe → carrito vacío
     */
    if (docSnap.exists()) {
      const data = docSnap.data();

      return { items: data.items || [] };
    } else {
      return { items: [] };
    }
  } catch (error) {
    console.error("Error al obtener carrito:", error);

    // fallback seguro
    return { items: [] };
  }
};

/** Elimina completamente el carrito del usuario
 *
 * @param {string} userId
 */
export const deleteCart = async (userId) => {

  if (!userId) return;

  try {
    await deleteDoc(doc(db, "carts", userId));
    console.log("🗑️ Carrito eliminado de Firebase");
  } catch (error) {
    console.error("Error al eliminar carrito:", error);
  }
};