// SocketContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { useSocket } from '../socket/useSocket'; 
import { Socket } from 'socket.io-client'; 


interface SocketContextProps {
  socket: Socket | null;
  online: boolean;
}


export const SocketContext = createContext<SocketContextProps | undefined>(undefined);


interface SocketProviderProps {
  children: ReactNode; 
}


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { socket, online } = useSocket('http://localhost:3000'); 
  //console.log (online)

  return (
    
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext debe ser usado dentro de un SocketProvider');
  }
  return context;
};
