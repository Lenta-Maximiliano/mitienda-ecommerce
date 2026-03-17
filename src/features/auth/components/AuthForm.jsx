import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setUser } from "../authSlice";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AuthForm({ action, buttonText, formId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const MySwal = withReactContent(Swal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await action(formValues.email, formValues.password);

      // Si no devuelve usuario, mostramos alerta
      if (!user) {
        await MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo completar la operación.",
          confirmButtonColor: "var(--color-primary)",
        });
        return;
      }

      // Guardamos el usuario en Redux
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      };
      dispatch(setUser(userData));

      // Mensaje de éxito (login o registro)
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

      navigate("/products");

    } catch (error) {
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

  // Configuración de campos del formulario
  const fields = [
    { name: "email", type: "email", label: "Email", placeholder: "tuemail@ejemplo.com" },
    { name: "password", type: "password", label: "Contraseña", placeholder: "********" },
  ];

  return (
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
            value={formValues[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition-all hover:cursor-pointer"
      >
        {buttonText}
      </button>
    </form>
  );
}