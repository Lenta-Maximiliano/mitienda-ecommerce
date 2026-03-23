import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/** Configuración de Firebase.
 *
 * Se obtiene desde variables de entorno (Vite) para 
 *  evitar exponer credenciales en el código fuente
 *
 * NOTA:
 * Asegurarse de definir estas variables en el archivo .env
 * con el prefijo VITE_ (requerido por Vite).
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa la aplicación de Firebase.
const app = initializeApp(firebaseConfig);

/** Instancia de Firestore. (base de datos)
 * 
 * Se utiliza para:
 * - Lectura de datos
 * - Escritura de datos
 * - Consultas a colecciones/documentos
 */
export const db = getFirestore(app);

/** Instancia de Authentication. (auth)
 *
 * Se utiliza para:
 * - Registro de usuarios
 * - Login
 * - Logout
 * - Manejo de sesión
 */
export const auth = getAuth(app);