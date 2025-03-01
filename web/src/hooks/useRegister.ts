import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true);
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });

    let hasError = false;
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    if (name.trim() === "") {
      newErrors.name = "O nome é obrigatório.";
      hasError = true;
    }
    if (!email.includes("@")) {
      newErrors.email = "Digite um e-mail válido.";
      hasError = true;
    }
    if (password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
      hasError = true;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(name, email, password);
      navigate("/");
    } catch (error) {
      setErrors({ ...newErrors, email: "E-mail já cadastrado ou erro na criação da conta." });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading, errors };
}
