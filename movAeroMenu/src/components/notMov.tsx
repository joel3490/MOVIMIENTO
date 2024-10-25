import { useState, useEffect } from "react"
import React from "react"
import { MdFlight } from "react-icons/md"
//import { socket } from "../socket/coneccionSocket"
import { getMovById, updateMov } from "../servicioApi/MovService";
import { Mensaje, Registro } from "../types/MovServices";


function NotMov() {

  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [registros, setRegistros] = useState<Registro[]>([])
  /* useEffect(() => {
    socket.on("enviarMov", async (data) => {
      setMensajes((mensajes) => [...mensajes, data])
      localStorage.setItem('notificaciones', JSON.stringify([...mensajes, data]));

      if (data.idmov) {
        try {
          const registroData = await getMovById(data.idmov)

          setRegistros((prevRegistros) => [...prevRegistros, registroData.data]);

          console.log('registro de mov por id', registroData.data)

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
  }, []) */
  

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

    setUnreadCount((prevCount) => Math.max(prevCount - 1, 0))
  }

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRegistro, setSelectedRegistro] = useState<Registro | null>(null);

  const openModal = (registro: Registro) => {
    setSelectedRegistro(registro);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRegistro(null);
  }

  const [horaArribo, setHoraArribo] = useState('');
  const [pistaArribo, setPistaArribo] = useState('');
  const [calleArribo, setCalleArribo] = useState('');
  const [idControladorArr, setIdControladorArr] = useState('');
  const [obsArribo, setObsArribo] = useState('');

  const handleActualizar = async () => {
    if (selectedRegistro) {
      try {
        const data = {
          horaArribo,
          pistaArribo,
          calleArribo,
          idControladorArr,
          obsArribo,
        }
        await updateMov(selectedRegistro.id, data)

        setUnreadCount((prevCount) => Math.max(prevCount - 1, 0))

        const index = mensajes.findIndex((mensaje) => mensaje.idmov === selectedRegistro.id);
        if (index !== -1) {
          setMensajes((prevMensajes) => {
            const nuevosMensajes = [...prevMensajes];
            nuevosMensajes.splice(index, 1);
            return nuevosMensajes;
          });
        }
        setRegistros((prevRegistros) => prevRegistros.filter((registro) => registro.id !== selectedRegistro.id))
        setPistaArribo("");
        setCalleArribo("");
        setIdControladorArr("");
        setObsArribo("");

        closeModal()
      } catch (error) {
        console.error('Error al actualizar el registro:', error)
      }
    }
  }
  //capturar hora  
  useEffect(() => {
    const obtenerHoraActual = () => {
      const ahora = new Date();
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      return `${horas}:${minutos}`;
    };

    setHoraArribo(obtenerHoraActual());
  }, []);

  const manejarCambioHora = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoraArribo(event.target.value);
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
            style={{ zIndex: 30 }}
          >
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">Registro</th>
                  <th className="text-left px-4 py-2">Nro Vuelo</th>
                  <th className="text-left px-4 py-2">Tipo Aeronave</th>
                  <th className="text-left px-4 py-2">Empresa</th>
                  <th className="text-left px-4 py-2">Procedencia</th>
                  <th className="text-left px-4 py-2">Hora Despegue</th>
                  <th className="text-left px-4 py-2">Controlador</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody >
                {registros.map((registro, index) => (
                  <tr key={index} className="hover:bg-blue-100">
                    <td className="px-4 py-2">{registro.idAvion}</td>
                    <td className="px-4 py-2">{registro.nroVuelo}</td>
                    <td className="px-4 py-2">{registro.modelo}</td>
                    <td className="px-4 py-2">{registro.propietario}</td>
                    <td className="px-4 py-2">{registro.procedencia} <br /> {registro.destProcedencia}</td>
                    <td className="px-4 py-2">{registro.horaDespegue}</td>
                    <td className="px-4 py-2">{registro.idControladorPro}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        type="button"

                        onClick={() => openModal(registro)}
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

        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-4xl w-full p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Progreso de Vulo</h2>
                <div className="p-5">
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th className="text-left px-4 py-2">Registro</th>
                        <th className="text-left px-4 py-2">Nro Vuelo</th>
                        <th className="text-left px-4 py-2">Tipo Aeronave</th>
                        <th className="text-left px-4 py-2">Empresa</th>
                        <th className="text-left px-4 py-2">Procedencia</th>
                        <th className="text-left px-4 py-2">Hora Despegue</th>
                        <th className="text-left px-4 py-2">Controlador</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">{selectedRegistro?.idAvion}</td>
                        <td className="px-4 py-2">{selectedRegistro?.nroVuelo}</td>
                        <td className="px-4 py-2">{selectedRegistro?.modelo}</td>
                        <td className="px-4 py-2">{selectedRegistro?.propietario}</td>
                        <td className="px-4 py-2">{selectedRegistro?.procedencia}</td>
                        <td className="px-4 py-2">{selectedRegistro?.horaDespegue}</td>
                        <td className="px-4 py-2">{selectedRegistro?.idControladorPro}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                          htmlFor="destino"
                        >
                          ARRIBO
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          id="destino"
                          name="destino"
                          placeholder="destino"
                          defaultValue={selectedRegistro?.destino}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                          htmlFor="destArribo"
                        >
                          DEST/ ARRIBO
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          id="destArribo"
                          name="destArribo"
                          placeholder="dest/ arribo"
                          defaultValue={selectedRegistro?.destArribo}
                        />
                      </div>
                    </div>{/* fin 2 inputs*/}


                    <div className="flex flex-wrap -mx-3 mb-1">
                      <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="horaArribo">
                          HORA ARRIBO
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="time"
                          id="horaArribo"
                          name="horaArribo"
                          value={horaArribo}
                          onChange={manejarCambioHora}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="pistaArribo">
                          RWY
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          id="pistaArribo"
                          name="pistaArribo"
                          value={pistaArribo}
                          onChange={(e) => setPistaArribo(e.target.value)}
                          placeholder="pista"
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="calleArribo">
                          TWY
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          id="calleArribo"
                          name="calleArribo"
                          value={calleArribo}
                          onChange={(e) => setCalleArribo(e.target.value)}
                          placeholder="c. rodaje"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                      <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="idControlador">
                          CONTROLADOR
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          id="idControlador"
                          name="idControlador"
                          value={idControladorArr}
                          onChange={(e) => setIdControladorArr(e.target.value)}
                          placeholder="controlador"
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="obs">
                          OBSERVACION
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          id="obs"
                          name="obs"
                          value={obsArribo}
                          onChange={(e) => setObsArribo(e.target.value)}
                          placeholder="observacion"
                        />
                      </div>
                    </div>

                  </div>{/*fin div forulario*/}
                </div>{/* fin de la tabla*/}
                <br />
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleActualizar}
                  //onClick={() => handleRecibir(index)}
                  >
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default NotMov;