import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setUser } from "../features/auth/authSlice";

export default function AuthForm({ action, buttonText, formId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await action(formValues.email, formValues.password);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      };
      dispatch(setUser(userData));
      alert(`${buttonText} exitoso!`);
      navigate("/products");
    } catch (error) {
      console.error(error);
      alert(`Error en ${buttonText.toLowerCase()}`);
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
        className="bg-[var(--color-primary)] text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition-all"
      >
        {buttonText}
      </button>
    </form>
  );
}