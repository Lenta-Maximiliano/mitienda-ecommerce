import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

// Guardar carrito de un usuario
export const saveCart = async (userId, cartItems) => {
  if (!userId) {
    console.error("UID de usuario no válido en saveCart");
    return;
  }

  const cartRef = doc(db, "carts", userId);

  try {
    if(cartItems.length > 0){

      await setDoc(cartRef, {
        items: cartItems,
        updatedAt: new Date().toISOString(),
      });
      console.log("✅ Carrito guardado/actualizado en Firebase");
    }
    else{
      await deleteDoc(cartRef);
      console.log("🗑️ Carrito vacío eliminado de Firebase");
    }
  } catch (error) {
    console.error("Error al guardar carrito:", error);
  }
};

// Obtener carrito de un usuario
export const getCart = async (userId) => {
  if (!userId) {
    console.error("UID de usuario no válido en getCart");
    return { items: [] };
  }

  try {
    const docRef = doc(db, "carts", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return { items: data.items || [] };
    } else {
      return { items: [] };
    }
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    return { items: [] };
  }
};

// Elimina carrito del usuario
export const deleteCart = async (userId) => {
  if (!userId) return;
  try {
    await deleteDoc(doc(db, "carts", userId));
    console.log("🗑️ Carrito eliminado de Firebase");
  } catch (error) {
    console.error("Error al eliminar carrito:", error);
  }
};