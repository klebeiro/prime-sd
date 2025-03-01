import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { FieldComponent, EmailFieldComponent, PasswordFieldComponent } from "../components/FieldComponents";
import { UserAccessLayout } from "../layouts/UserAccessLayout";

function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const { handleRegister, isLoading, errors } = useRegister();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleRegister(formData.name, formData.email, formData.password, formData.confirmPassword);
  };

  return (
    <UserAccessLayout title="Crie sua conta">
      <FieldComponent label="Nome" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <EmailFieldComponent value={formData.email} onChange={handleChange} error={errors.email} />
      <PasswordFieldComponent value={formData.password} onChange={handleChange} error={errors.password} />
      <PasswordFieldComponent
        label="Confirmar Senha"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-lg transition ${
          isLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-600"
        }`}
      >
        {isLoading ? "Criando conta..." : "Criar Conta"}
      </button>

      <a href="/" className="block text-center text-sm text-gray-500 mt-4 hover:underline">
        Voltar para o Login
      </a>
    </UserAccessLayout>
  );
}

export default RegisterPage;
