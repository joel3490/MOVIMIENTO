import { useState, useEffect } from "react"
import React from "react"
import { MdFlight } from "react-icons/md"
import { socket } from "../socket/coneccionSocket"

type Mensaje = {
  usuario: string;
  mensaje: string;
};

function NotMov() {
  
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    socket.on("enviarMov", (data) => {
      console.log(data, "desde el notMov")
      setMensajes((mensajes) => [...mensajes, data])
      setUnreadCount((prevCount) => prevCount + 1)
    })

    return () => {
      socket.off("connect")
      socket.off("chat_mensaje")
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
    // Eliminar el mensaje del array
    setMensajes((prevMensajes) => {
      const nuevosMensajes = [...prevMensajes]
      nuevosMensajes.splice(index, 1); // Elimina el mensaje por índice
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
          {/* Aquí está la notificación */}
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
                {mensajes.map((mensaje, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{mensaje.usuario}</td>
                    <td className="px-4 py-2">{mensaje.mensaje}</td>
                    <td className="px-4 py-2">{mensaje.mensaje}</td>
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
