import { useState } from "react";
import { createOrder } from "../services/orderService";

export function create() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ value: "", description: "" });
    const [success, setSuccess] = useState(false);

    const handleCreate = async (value: string, description: string) => {
        setIsLoading(true);
        setErrors({ value: "", description: "" });

        let hasError = false;
        const newErrors = { value: "", description: "" };

        if(value == "" && description == "") {
            newErrors.description = "Preencha algum campo para criar.";
            hasError = true;
        }

        if(value == "") {
            newErrors.value = "Digite um valor.";
            hasError = true;
        }

        if(description == "") {
            newErrors.description = "Digite uma descrição.";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            setIsLoading(false);
            setSuccess(false);
            return;
        }

        try {
            await createOrder(value, description);
            setSuccess(true);
        } catch (error) {
            setErrors({ ...newErrors, description: "Não foi possível criar o pedido" });
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }
    
    return { handleCreate, isLoading, errors, success };
}