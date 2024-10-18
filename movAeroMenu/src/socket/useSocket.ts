import { useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { UseSocketResult } from '../types/SocketServices';


export const useSocket = (serverPath: string): UseSocketResult => {
  
  /* const socket: Socket = useMemo(
    () => io(serverPath, { transports: ['websocket'] }),
    [serverPath]
  ); */

  const [socket, setSocket] = useState<Socket | null>(null)
  const [online, setOnline] = useState<boolean>(false);


  const conectarSocket = useCallback(() => {
    const token = localStorage.getItem('auth_token')
    const socketTemp = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: { 'auth_token': token },
    });

    socketTemp.on('connect', () => setOnline(true));
    socketTemp.on('disconnect', () => setOnline(false));    
    
    setSocket(socketTemp);    
  }, [serverPath]);


  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);


  useEffect(() => {
    setOnline(socket?.connected||false); 
  }, [socket]);


  useEffect(() => {
    socket?.on('connect', () => setOnline(true));
    return () => {
      socket?.off('connect');
    };
  }, [socket]);


  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false));
    return () => {
      socket?.off('disconnect');
    };
  }, [socket]);
  

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};