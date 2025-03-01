import { useState } from "react";
import { updateUser } from "../services/userService";

export function update() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [success, setSuccess] = useState(false);

    const handleUpdate = async (name: string, email: string, password: string, confirmPassword: string) => {
        setIsLoading(true);
        setErrors({ name: "", email: "", password: "", confirmPassword: "" });

        let hasError = false;
        const newErrors = { name: "", email: "", password: "", confirmPassword: "" };

        if(email == "" && name == "" && password == "" && confirmPassword == "") {
            newErrors.confirmPassword = "Preencha algum campo para editar.";
            hasError = true;
        }

        if (email != "" && !email.includes("@")) {
            newErrors.email = "Digite um e-mail válido.";
            hasError = true;
        }
        if (password != "" && password.length < 8) {
            newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
            hasError = true;
        }
        if (password != "" && password !== confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem.";
            hasError = true;
        }

        if(password == "" && confirmPassword != "") {
            newErrors.confirmPassword = "Preencha a senha para confirmar.";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            setIsLoading(false);
            setSuccess(false);
            return;
        }

        try {
            await updateUser(name, email, password);
            setSuccess(true);
        } catch (error) {
            setErrors({ ...newErrors, confirmPassword: "Não foi possível atualizar os dados do usuário" });
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleUpdate, isLoading, errors, success };
}
  