import { useState, useEffect } from "react"
import React from "react"
import { MdFlight } from "react-icons/md"
import { socket } from "../socket/coneccionSocket"
import { getMovById } from "../servicioApi/MovService";

type Mensaje = {
  id: string
  idmov: string
};

function NotMov() {
  
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [registros, setRegistros] = useState<any[]>([]);

  
  useEffect(() => {
    socket.on("enviarMov", async(data) => {
      setMensajes((mensajes) => [...mensajes, data])

      if (data.idmov) {
        try {
          const registroData = await getMovById(data.idmov)
          
          
          setRegistros((prevRegistros) => [...prevRegistros, registroData]);
          
          console.log('registro de mov por id', registroData)
          
        } catch (error) {
          console.error("Error al obtener el registro:", error)
        }
      }

      setUnreadCount((prevCount) => prevCount + 1)      
      console.log(data, "desde el notMov", data.idmov)
    })    
    return () => {
      socket.off("connect")
      socket.off("enviarMov")
    }
  }, [])
  


  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleRecibir = (index: number) => {
    
    setMensajes((prevMensajes) => {
      const nuevosMensajes = [...prevMensajes]
      nuevosMensajes.splice(index, 1); 
      return nuevosMensajes;
    })

    // Decrementar el contador de mensajes no leídos
    setUnreadCount((prevCount) => Math.max(prevCount - 1, 0))
  }

  return (
    <>
      <div className="flex justify-end relative pr-10">
        <div className="icon-container">
          <MdFlight
            size={50}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ zIndex: 20 }}
          />
          <span className="notification">{unreadCount}</span>{" "}
          
        </div>

        {isHovered && (
          <div
            id="notificacion"
            className="absolute top-12 right-0 bg-white p-6 shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ zIndex: 30 }} // Asegúrate de que el z-index sea mayor que el del formulario
          >
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">PROCEDENCIA</th>
                  <th className="text-left px-4 py-2">MATRICULA</th>
                  <th className="text-left px-4 py-2">CONTROLADOR</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{registro.destArribo}</td>
                    <td className="px-4 py-2">{registro.calleProcedencia}</td>
                    <td className="px-4 py-2">{registro.destArribo}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        type="button"
                        onClick={() => handleRecibir(index)}
                      >
                        Recibir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default NotMov;