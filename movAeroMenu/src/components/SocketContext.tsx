// SocketContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../socket/useSocket'; 
import { SocketContextProps, SocketProviderProps } from '../types/SocketServices';



export const SocketContext = createContext<SocketContextProps | undefined>(undefined);


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:3000'); 
  
  
  
  console.log (socket)

 



  

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
