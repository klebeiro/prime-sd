import { useEffect, useState } from "react";
import { fetchOrders, Order } from "../services/orderService";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError("Erro ao carregar os pedidos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { orders, isLoading, error, setOrders };
}
