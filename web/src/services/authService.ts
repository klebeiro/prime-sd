import config from "../config.ts";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${config.apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Falha na autenticação. Verifique suas credenciais.");
    }

    const result = await response.json();

    console.log(result);

    localStorage.setItem("token", result.data.token);
    return result;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

export async function registerUser(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${config.apiUrl}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Falha ao criar conta. Verifique os dados.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
}
