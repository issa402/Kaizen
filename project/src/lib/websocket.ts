import { useEffect, useRef, useState } from 'react';

const WS_URL = 'wss://bhrtzvhujqfwoznxidqu.supabase.co/realtime/v1/websocket';

export function useWebSocket<T>(channel: string) {
  const [messages, setMessages] = useState<T[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channel: channel
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'broadcast' && data.event === 'news') {
        setMessages(prev => [...prev, data.payload]);
      }
    };

    return () => {
      ws.close();
    };
  }, [channel]);

  return messages;
}