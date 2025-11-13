import { Link } from "react-router-dom";
import { register } from "../../services/authService";
import AuthForm from "../../components/AuthForm";

export default function Register() {
  return (
    <div className="bg-[var(--color-soft)] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">Crear cuenta</h1>
        <AuthForm action={register} buttonText="Registrarse" formId="register" />
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