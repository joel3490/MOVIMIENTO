

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import './index.css';
import { router } from './routers/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SocketProvider } from './components/SocketContext';
import { ChatContext, ChatProvider } from './components/chatContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ChatProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </QueryClientProvider>
    </ChatProvider>
  </React.StrictMode>,


);

