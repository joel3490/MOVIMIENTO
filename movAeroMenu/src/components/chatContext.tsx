import React, { createContext, ReactNode, useContext } from 'react';
import { ChatContextProps, initialState } from '../types/SocketServices';

import { useReducer } from 'react';
import { chatReducer } from '../socket/chatReducer';


export const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    
    const [chatState, dispatch] = useReducer(chatReducer, initialState); 
    return (
        <ChatContext.Provider value={{
            stateSocket: chatState, dispatch
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext debe ser usado dentro de un ChatProvider');
    }
    return context;
};
