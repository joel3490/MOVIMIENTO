
import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';
import { Socket } from 'socket.io-client'; 


export interface SocketContextProps {
    socket: Socket | null;
    online: boolean;
  }

export interface SocketProviderProps {
    children: ReactNode; 
  }

export interface UseSocketResult {
    socket: Socket | null;
    online: boolean;
    conectarSocket: () => void;
    desconectarSocket: () => void;
  }


 