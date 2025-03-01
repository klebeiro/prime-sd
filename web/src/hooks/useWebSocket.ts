import { useEffect, useState } from "react";

export const useWebSocket = (url: string, onMessage: (data: any) => void) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onclose = () => {
      console.log("WebSocket desconectado");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket };
};
