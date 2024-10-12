import React, { useEffect, useState } from "react"
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const FechaHora = () => {
    const [fechaHora, setFechaHora] = useState(new Date());
  
    useEffect(() => {
      const timerID = setInterval(() => {
        setFechaHora(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timerID);
      };
    }, []);

    const formatoFecha = 'PPPP'; // Ejemplo: martes, 9 de julio de 2024
    const formatoHora = 'HH:mm:ss aa'; // Ejemplo: 10:22:12 PM

  
    return (
      <div className="font-semibold text-xl">
       {format(fechaHora, `${formatoFecha} `, { locale: es })}
       <br />
       {format(fechaHora, `${formatoHora}`, { locale: es })}
      </div>
    );
  };