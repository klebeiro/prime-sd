import React, { useState } from "react";
import { useAuth } from "../hooks/userAuth";
import { EmailFieldComponent, PasswordFieldComponent } from "../components/FieldComponents";
import { UserAccessLayout } from "../layouts/UserAccessLayout";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleLogin, isLoading, errors } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(formData.email, formData.password);
  };

  return (
    <UserAccessLayout title="Bem-vindo(a)!">
      <EmailFieldComponent value={formData.email} onChange={handleChange} error={errors.email} />
      <PasswordFieldComponent value={formData.password} onChange={handleChange} error={errors.password} />

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!formData.email || !formData.password || isLoading}
        className={`w-full py-2 px-4 rounded-lg transition ${
          !formData.email || !formData.password || isLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-600"
        }`}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </button>

      <a href="/register" className="block text-center text-sm text-gray-500 mt-4 hover:underline">
        Criar Conta
      </a>
    </UserAccessLayout>
  );
}

export default LoginPage;
