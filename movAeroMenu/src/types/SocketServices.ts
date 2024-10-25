import { ReactNode } from 'react';
import { Socket } from 'socket.io-client'; 

//? coneccion de socket 
export interface SocketContextProps {
    socket: Socket | null;
    online: boolean;
    conectarSocket: () => void;
    desconectarSocket: () => void;
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

// ? PARA EL CASE
export const types = {

    aeroUserCargados: '[Chat] Usuarios cargados',
    activarChat: '[Chat] Activar Chat',
    nuevoMensaje: '[Chat] Nuevo Mensaje',
    cargarMensajes: '[Chat] Cargar Mensajes',
    authentificacion: '[chat] Autentificador'
}



//?  INTERFASES DE CHAT CONTEXT
// Estado inicial con valores por defecto
export const initialState: ChatState = {
  uid: '',
  chatActivo: null,
  aeroUser: [],
  mensajes: [],
  userAuth: null
};
// Definimos la estructura del estado inicial
export interface ChatState {
  uid: string;
  chatActivo: string | null; // UID del usuario al que se quiere enviar mensajes
  aeroUser: Usuario[]; // Lista de usuarios
  mensajes: Mensaje[]; // El chat seleccionado (historial de mensajes)
  userAuth: Usuario | null;
}

// Definimos los tipos de las acciones posibles
export interface ChatAction {
  type: string;
  payload?: any; // El payload es opcional, puede depender del tipo de acción
  //payload?: Usuario | Usuario[] | string | null;
}


// Interfaces adicionales para tipos de usuarios y mensajes
export interface Usuario {
  id_oaci: string;
  nombre: string;
  regional: string;
  online: boolean

  // Puedes añadir otros campos aquí según lo que necesites
}

export interface Mensaje {
  de: string; // UID del remitente
  para: string; // UID del destinatario
  mensaje: string; // Contenido del mensaje
  // Puedes añadir otros campos aquí, como timestamp
}


export interface ChatContextProps {
  state: ChatState;      // Este es el estado global del chat
  dispatch: React.Dispatch<ChatAction>; // Esto es lo que usas para despachar acciones al reducer
}



