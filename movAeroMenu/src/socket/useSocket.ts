import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { UseSocketResult } from '../types/SocketServices';

export const useSocket = (serverPath: string): UseSocketResult => {
  const [online, setOnline] = useState(false); 
  const socket = useRef<Socket | null>(null);   

  
  
  
  const conectarSocket = useCallback(() => {
    
    const token = localStorage.getItem('auth_token')
    

    if (token && !socket.current) {
      const newSocket = io(serverPath, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: {'auth_token': token  } 
      });
      socket.current = newSocket;

      newSocket.on('connect', () => {
        console.log('Conectado al servidor');
        setOnline(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Desconectado del servidor');
        setOnline(false);
      });

      
    }
  }, [serverPath]);

  const desconectarSocket = useCallback(() => {
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
      setOnline(false);
    }
  }, []);

  useEffect(() => {
    conectarSocket(); // Conectar al cargar el componente

    return () => {
      desconectarSocket(); // Desconectar al desmontar el componente
    };
  }, [conectarSocket, desconectarSocket]);

  return {
    socket: socket.current,
    online,
    conectarSocket,
    desconectarSocket,
  };
};



