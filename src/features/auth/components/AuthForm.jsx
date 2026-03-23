import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/** AuthForm
 *
 * Componente reutilizable para autenticación (login / registro).
 *
 * Responsabilidades:
 * - Gestionar estado local del formulario (email / password)
 * - Ejecutar acción de autenticación (login o register)
 * - Manejar feedback al usuario (éxito / error)
 * - Redirigir tras autenticación exitosa
 * 
 * IMPORTANTE:
 * - NO maneja estado global (Redux)
 * - Firebase es la fuente de verdad → AuthListener se encarga de sincronizar el usuario
 *
 * @param {Function} action - Función async (login o register)
 * @param {string} buttonText - Texto del botón (ej: "Ingresar", "Registrarse")
 * @param {string} formId - Prefijo único para IDs (accesibilidad)
 */
export default function AuthForm({ action, buttonText, formId }) {

  // Hook de navegación
  const navigate = useNavigate();

  /** Estado local del formulario
   * - Controla inputs de email y password
   */
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  //Inicialización de SweetAlert2 con soporte para React
  const MySwal = withReactContent(Swal);

  /** Maneja cambios en los inputs
   * - Actualiza estado de forma controlada
   * - Usa name dinámico para escalar fácilmente
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

   /** Maneja envío del formulario
   *
   * Flujo:
   * 1. Previene submit por defecto
   * 2. Ejecuta login/register (Firebase)
   * 3. Firebase actualiza sesión interna
   * 4. AuthListener detecta cambio → actualiza Redux
   * 5. Se muestra feedback al usuario (toast)
   * 6. Redirige al usuario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ejecuta acción de autenticación
      const user = await action(formValues.email, formValues.password);

      // Validación defensiva: En caso de que la acción no retorne usuario
      if (!user) {
        await MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo completar la operación.",
          confirmButtonColor: "var(--color-primary)",
        });
        return;
      }

      // Feedback de éxito (toast). Diferencia entre login y registro
      await MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: buttonText === "Ingresar" ? "Ingreso exitoso" : "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
        width: "auto",
        customClass: {
          popup: "text-sm p-3 rounded-lg shadow-sm",
          title: "text-sm font-medium",
        },
      });

      /** Redirección post-auth
       * 
       * Nota:
       * El estado del usuario ya fue sincronizado
       * automáticamente por AuthListener
       */
      navigate("/products");

    } catch (error) {
      /**  Manejo de errores
       * - Log para debugging
       * - Feedback visual para usuario
       */
        console.error(error);

        // Mostramos error con SweetAlert2
        MySwal.fire({
          icon: "error",
          title: "Error",
          text:
            buttonText === "Ingresar"
              ? "Correo o contraseña incorrectos."
              : "No se pudo registrar el usuario.",
          confirmButtonColor: "var(--color-primary)",
        });
      }
  };

  // Determina si el formulario es de login o registro
  const isLogin = buttonText === "Ingresar";

  /** Configuración de campos del formulario
   * - Permite escalar fácilmente (ej: agregar username)
   * - Evita duplicación de markup
   */
  const fields = [
    { 
      name: "email", 
      type: "email", 
      label: "Email", 
      placeholder: "tuemail@ejemplo.com",
      autoComplete: "email"
    },
    { 
      name: "password", 
      type: "password", 
      label: "Contraseña", 
      placeholder: "********",
      autoComplete: isLogin ? "current-password" : "new-password" 
    },
  ];

  return (
    // Formulario controlado
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {fields.map((field) => (
        <div key={field.name}>

          <label
            htmlFor={`${formId}-${field.name}`}
            className="block text-sm font-medium text-gray-600"
          >
            {field.label}
          </label>

          <input
            type={field.type}
            id={`${formId}-${field.name}`}
            name={field.name}
            autoComplete={field.autoComplete}
            value={formValues[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      ))}

      {/* Botón de submit */}
      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition-all hover:cursor-pointer"
      >
        {buttonText}
      </button>
    </form>
  );
}