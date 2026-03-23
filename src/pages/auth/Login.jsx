import { Link } from "react-router-dom";
import { login } from "../../features/auth/authService";
import AuthForm from "../../features/auth/components/AuthForm";

/** Login Page
 *
 * Página de inicio de sesión.
 *
 * Responsabilidades:
 * - Renderizar UI de autenticación (login)
 * - Proveer acción de login al componente AuthForm
 * - Ofrecer navegación hacia registro
 *
 * Nota:
 * - AuthForm maneja toda la lógica (estado, submit, validación)
 */
export default function Login() {
  return (
    // Contenedor principal. (Centra el formulario en pantalla)
    <div className="bg-[var(--color-soft)] flex items-center justify-center p-6">

      {/* Card de login */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">

        {/* Título */}
        <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">Iniciar sesión</h1>

        {/* 
          Formulario reutilizable

          Props:
          - action: función login (Firebase o servicio)
          - buttonText: define comportamiento UX
          - formId: usado para accesibilidad (labels únicos)
        */}
        <AuthForm 
          action={login} 
          buttonText="Ingresar" 
          formId="login" 
        />

        {/* Link a registro */}
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          ¿No tenés cuenta?{" "}
          <Link 
            to="/auth/register" 
            className="text-[var(--color-primary)] hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
        
      </div>
    </div>
  );
}