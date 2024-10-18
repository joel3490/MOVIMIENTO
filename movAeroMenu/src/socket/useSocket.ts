import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketResult {
  socket: Socket;
  online: boolean;
}

export const useSocket = (serverPath: string): UseSocketResult => {
  
  const socket: Socket = useMemo(
    () => io(serverPath, { transports: ['websocket'] }),
    [serverPath]
  );

  const [online, setOnline] = useState<boolean>(false);

  useEffect(() => {
    setOnline(socket.connected); 
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => setOnline(true));
    return () => {
      socket.off('connect');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => setOnline(false));
    return () => {
      socket.off('disconnect');
    };
  }, [socket]);

  return {
    socket,
    online,
  };
};