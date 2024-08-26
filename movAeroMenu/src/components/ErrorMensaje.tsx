import React from "react";

interface ErrorMensajeProps {
  mensaje: string;
}

const ErrorMensaje: React.FC<ErrorMensajeProps> = ({ mensaje }) => {
  return (
    
    <div className="alert">
    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
      Danger
    </div>
    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    {mensaje}
    </div>
  </div>
  );
}

export default ErrorMensaje;