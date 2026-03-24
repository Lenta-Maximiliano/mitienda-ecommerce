import { Link } from "react-router-dom";
import { register } from "../../features/auth/services/authService";
import AuthForm from "../../features/auth/components/AuthForm";

/** Register Page
 *
 * Página de registro de usuario.
 *
 * Responsabilidades:
 * - Renderizar la interfaz de creación de cuenta
 * - Inyectar la acción de registro al formulario reutilizable
 * - Proveer navegación hacia login
 *
 * Arquitectura:
 * - Sigue el patrón "contenedor + componente reutilizable"
 * - AuthForm maneja toda la lógica (estado, submit, validaciones)
 */
export default function Register() {
  return (
    // Contenedor principal. (Centra el formulario en pantalla)
    <div className="bg-[var(--color-soft)] flex items-center justify-center p-6">

      {/* Card de registro */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">

        {/* Título */}
        <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
          Crear cuenta
        </h1>

        {/*
          Formulario reutilizable
          
          Props:
          - action: función de registro (Firebase / servicio externo)
          - buttonText: define UX del botón
          - formId: prefijo para IDs (mejora accesibilidad)
        */}
        <AuthForm 
          action={register} 
          buttonText="Registrarse" 
          formId="register" 
        />

        {/* Navegación hacia login */}
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          ¿Ya tenés cuenta?{" "}
          <Link to="/auth/login" className="text-[var(--color-primary)] hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}