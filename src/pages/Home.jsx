import { login, register } from "../services/authService";
import AuthForm from "../components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-soft)] px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        <div className="bg-white shadow-md rounded-[var(--radius-lg)] p-6 w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-primary)]">
            Iniciar sesión
          </h2>
          <AuthForm action={login} buttonText="Ingresar" formId="login" />
        </div>

        <div className="bg-white shadow-md rounded-[var(--radius-lg)] p-6 w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-primary)]">
            Crear cuenta
          </h2>
          <AuthForm action={register} buttonText="Registrarse" formId="register" />
        </div>
      </div>
    </div>
  );
}