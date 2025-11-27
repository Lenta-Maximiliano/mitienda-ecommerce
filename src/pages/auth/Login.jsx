import { Link } from "react-router-dom";
import { login } from "../../services/authService";
import AuthForm from "../../components/auth/AuthForm";

export default function Login() {
  return (
    <div className="bg-[var(--color-soft)] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">Iniciar sesión</h1>
        <AuthForm action={login} buttonText="Ingresar" formId="login" />
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          ¿No tenés cuenta?{" "}
          <Link to="/auth/register" className="text-[var(--color-primary)] hover:underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}