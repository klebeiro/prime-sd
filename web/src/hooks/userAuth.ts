import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setErrors({ email: "", password: "" });

    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!email.includes("@")) {
      newErrors.email = "Digite um e-mail válido (exemplo@dominio.com)";
      hasError = true;
    }
    if (password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await loginUser(email, password);
      navigate("/orders");
    } catch (error) {
      setErrors({ email: "", password: "E-mail ou senha incorretos" });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, errors };
}
