import config from "../config.ts";

export type Order = {
    id: string;
    value: string;
    description: string;
    status: string;
};
  
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${config.apiUrl}/order`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar pedidos");
    }

    const result = await response.json();

    return result.data.map((order: any) => ({ id: order.id, value: order.price, description: order.description, status: order.status }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrder = async (value: string, description: string): Promise<Order> => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(`${config.apiUrl}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ price: value, description }),
    });
    
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}