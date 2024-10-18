import { useSocketContext } from './SocketContext';

export const Prueba = () => {
  const { socket, online } = useSocketContext(); 

  return (
    <div>
      <h1>{online ? 'Conectado' : 'Desconectado'}</h1>
    </div>
  );
};