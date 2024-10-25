// SocketContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../socket/useSocket';
import { SocketContextProps, SocketProviderProps, types } from '../types/SocketServices';
import { ChatContext } from './chatContext';
import { getAerouser } from '../servicioApi/AuthService';

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://10.100.12.245:3000');
  //console.log (socket)
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error('El ChatContext debe estar dentro de un ChatProvider');
  }


  const { dispatch } = chatContext

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      conectarSocket();
    }
    return () => {
      desconectarSocket();
    };
  }, [conectarSocket, desconectarSocket]);

  useEffect(() => {

    socket?.on('lista-usuarios', (getUserAero) => {
      //console.log(getUserAero)
      dispatch({
        type: types.aeroUserCargados,
        payload: getUserAero
      })
    })
  }, [socket, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAerouser();
        const userAuth = response.data;
        //console.log('Usuario autenticado recuperado desde la API:', userAuth)
        dispatch({ type: types.authentificacion, payload: userAuth });
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    };
    fetchUser();
  }, [dispatch]);


  return (

    <SocketContext.Provider value={{ socket, online, conectarSocket, desconectarSocket }}>
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
