import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  useLocation,
} from "react-router-dom";
import { crearMov } from "../servicioApi/MovService";
import ErrorMensaje from "./ErrorMensaje";
import { fpl } from "../types/FplServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarCampos } from "../types/MovServices";
import { Prueba } from "./ConexionSocket";
import { ChatContext, useChatContext } from "./chatContext";
import { types } from "../types/SocketServices";
import { SocketContext } from "./SocketContext";

export async function action({ request }: ActionFunctionArgs) {
  const f = await request.formData();
  const data: { [key: string]: any } = {};

  f.forEach((value, key) => {
    data[key] = value;
  });

  const validationError = validarCampos(data);

  if (validationError) {
    toast.error(validationError, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return null;
  }


    
  try {
    
    const socketId = await crearMov(data);
    console.log(socketId)
    localStorage.setItem("socketId", socketId);

    toast.success("Se envió el vuelo", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    
    return redirect("/mov");
  } catch (error) {
    toast.error("Ocurrió un error al crear el movimiento.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return null;
  }

  //console.log(data) para ver q llegue los datos hasta ahi

  //console.log('desde el formulario', nuevoId);
}

 function FormMov() {
  //ESTAS LINEA SON PRINCIPALES
  const location = useLocation();
  const error = useActionData() as string;

  const [c7Part1, setc7Part1] = useState("");
  
  
  const [nuevoId, setNuevoId] = useState<string | null>(null)
  
  useEffect(() => {
    const interval = setInterval(() => {
      const storedSocketId = localStorage.getItem("socketId");
      if (storedSocketId && storedSocketId !== nuevoId) {
        setNuevoId(storedSocketId);
        //console.log("Nuevo ID (socketId) actualizado:", storedSocketId);
        localStorage.removeItem("socketId"); // Limpia después de asignarlo
      }
    }, 900); // Verifica cada segundo
  
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [nuevoId]);
  


  const context = useContext(ChatContext);
  if (!context) { throw new Error("TuFormulario debe estar dentro de un ChatProvider"); }
  const { dispatch } = context;
  const socketContext = useContext(SocketContext);
  if (!socketContext) { console.error('El contexto de socket no está disponible'); return null; }
  const { socket, online } = socketContext;
  const { stateSocket } = useChatContext();
  const { userAuth } = stateSocket;

  useEffect(() => {
    if (nuevoId && socket && online) {
      //console.log("Emitir evento con nuevoId:", nuevoId);
      socket.emit('enviarMov', {
        procedencia: userAuth?.id_oaci,
        destino: c7Part1,
        idRegistro: nuevoId
      });
      //console.log('Evento emitido: enviarMov');
    }/*  else if (!online) {
      console.error('Socket no conectado o fuera de línea');
    } */
  }, [nuevoId, socket, online, userAuth, c7Part1]);

  const enviarUser = () => {
    //dispach
    if (c7Part1) {
      dispatch({
        type: types.activarChat,
        payload: c7Part1,
      });
      console.log("Usuario enviado al contexto:", c7Part1);
    } else {
      console.log("c7Part1 está vacío");
    }
    //socket.io
    
  };
  //const location = useLocation();
  const state = location.state as { selectedFpl?: fpl };

  //const error = useActionData() as string;

  const [fecha, setFecha] = useState("");
  const [c1, setc1] = useState("");
  const [c2, setc2] = useState("");
  const [c3, setc3] = useState("");
  const [c4, setc4] = useState("");
  const [c5, setc5] = useState("");
  const [c5Part1, setc5Part1] = useState("");
  const [c5Part2, setc5Part2] = useState("");

  const [c6, setc6] = useState("");
  const [c6FirstWord, setc6FirstWord] = useState("");
  const [c6Rest, setc6Rest] = useState("");
  const [nivel, setNivel] = useState("");

  const [c7, setc7] = useState("");

  
  const [c7Part2, setc7Part2] = useState("");
  const [c8, setc8] = useState("");
  //sacar la matricula de c8
  const [reg, setReg] = useState("");
  //sacar la empresa de c8
  const [opr, setOpr] = useState("");
  //sacar el destino para ZZZZ
  const [dest1, setDest1] = useState("");
  const [dest2, setDest2] = useState("");
  const [pista, pistaDest] = useState("");
  const [calle, calleDest] = useState("");
  const [alterno, setAlterno] = useState("");

  //capturar fecha
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;
    setFecha(todayDate);
  }, []);

  //capturar hora
  const [hora, setHora] = useState("");
  useEffect(() => {
    const obtenerHoraActual = () => {
      const ahora = new Date();
      const horas = String(ahora.getHours()).padStart(2, "0");
      const minutos = String(ahora.getMinutes()).padStart(2, "0");
      return `${horas}:${minutos}`;
    };

    setHora(obtenerHoraActual());
  }, []);

  const manejarCambioHora = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHora(event.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };




  useEffect(() => {
    if (state?.selectedFpl) {
      //console.log('Selected FPL data: desde formMov', state.selectedFpl);

      //nro de vuelo
      setc1(state.selectedFpl.c1);
      // tipo de vuelo
      setc2(state.selectedFpl.c2);
      //modelo de avion
      setc3(state.selectedFpl.c3.split("/")[0]);
      //detalles de vuelo
      setc4(state.selectedFpl.c4);
      //procedencia del vuelo

      const c5Value = state.selectedFpl.c5.trim();

      const c5Part1 = c5Value.substring(0, 4); // 'SAEZ' aeropuerto
      const c5Part2 = c5Value.substring(4); // '1800' hora de salida
      setc5Part1(c5Part1);

      const formatoHora = `${c5Part2.substring(0, 2)}:${c5Part2.substring(2)}`;
      setc5Part2(formatoHora);

      const regDest1 = state.selectedFpl.c8.match(/DEP\/(.+)/);
      if (c5Part1 === "ZZZZ") {
        // console.log(c5Part1)
        if (regDest1) {
          let regValue = regDest1[1];
          const threeLetterWordPattern = /\b\w{3}\/\b/;
          const match = regValue.match(threeLetterWordPattern);
          if (match) {
            const endIndex = regValue.indexOf(match[0]);
            regValue = regValue.substring(0, endIndex).trim();
          }
          const cleanedValue = regValue.replace(/[().\/]/g, "");
          setDest1(cleanedValue);
        }
      } else {
        setDest1("");
      }

      //velocidad, nivel y ruta del vuelo
      const c6Value = state.selectedFpl.c6.trim();
      const c6Parts = c6Value.split(" ");
      const firstWord = c6Parts[0] || "";
      setc6FirstWord(c6Parts[0] || "");
      setc6Rest(c6Parts.slice(1).join(" "));
      setc6FirstWord(firstWord);
      const nivelPart = firstWord.split("F")[1] || "";
      setNivel(nivelPart);

      //destino del vuelo
      const c7Value = state.selectedFpl.c7.trim();
      const c7Part1 = c7Value.substring(0, 4); // 'SAEZ' aeropuerto
      const c7Part2 = c7Value.substring(4, 8); // '1800' hora de salida
      const c7formatoHora = `${c7Part2.substring(0, 2)}:${c7Part2.substring(
        2
      )}`;
      setc7Part1(c7Part1);
      setc7Part2(c7formatoHora);

      const words = c7Value.split(" ");
      const alterno = words.slice(1).join(" ");
      setAlterno(alterno)
      



      const regDest2 = state.selectedFpl.c8.match(/DEST\/(.+)/);
      if (c7Part1 === "ZZZZ") {
        if (regDest2) {
          let regValue = regDest2[1];
          const threeLetterWordPattern = /\b\w{3}\/\b/;
          const match = regValue.match(threeLetterWordPattern);
          if (match) {
            const endIndex = regValue.indexOf(match[0]);
            regValue = regValue.substring(0, endIndex).trim();
          }
          const cleanedValue = regValue.replace(/[().\/]/g, "");
          setDest2(cleanedValue);
        } else {
          setDest2("");
        }
      } else {
        setDest2("");
      }

      //mensaje complementario
      setc8(state.selectedFpl.c8);

      const regReg = state.selectedFpl.c8.match(/REG\/(\S+)/);
      if (regReg) {
        const regValue = regReg[1].replace(/[()]/g, "");
        setReg(regValue);
      } else {
        setReg(state.selectedFpl.c1);
      }

      const regOpr = state.selectedFpl.c8.match(/OPR\/(.+)/);
      if (regOpr) {
        let regValue = regOpr[1];
        const threeLetterWordPattern = /\b\w{3}\/\b/;
        const match = regValue.match(threeLetterWordPattern);
        if (match) {
          const endIndex = regValue.indexOf(match[0]);
          regValue = regValue.substring(0, endIndex).trim();
        }
        const cleanedValue = regValue.replace(/[().\/]/g, "");
        setOpr(cleanedValue);
      } else {
        setOpr("");
      }
    }
  }, [state?.selectedFpl]);

  return (
    <>
      <Prueba />

      <ToastContainer />

      {error && <ErrorMensaje mensaje={error} />}

      <Form method="POST" className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="fecha"
            >
              FECHA
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
              id="fecha"
              name="fecha"
              placeholder="MATRICULA"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="propietario"
            >
              EMPRESA
            </label>
            <div className="flex">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-l py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                id="propietario"
                name="propietario"
                placeholder="empresa"
                value={opr}
                onChange={(e) => setOpr(e.target.value)}
              />

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 rounded-r"
                type="button"
                onClick={openModal}
              >
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 2a8 8 0 015.29 13.29l5.38 5.38a1 1 0 01-1.42 1.42l-5.38-5.38A8 8 0 1110 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Buscar Empresa
                  </h2>
                  <input
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4"
                    placeholder="Buscar..."
                  />
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
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0"></div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="idAvion"
            >
              REGISTRO
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="idAvion"
              name="idAvion"
              placeholder="registro"
              value={reg}
              onChange={(e) => setReg(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="nroVuelo"
            >
              NRO VUELO
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="nroVuelo"
              name="nroVuelo"
              placeholder="nro Vuelo"
              value={c1}
              onChange={(e) => setc1(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="modelo"
            >
              TIPO DE AERONAVE
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="modelo"
              name="modelo"
              placeholder="modelo"
              value={c3}
              onChange={(e) => setc3(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="nivel"
            >
              FL
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="nivel"
              name="nivel"
              placeholder="nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            />
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="ruta"
            >
              SID / RUTA
            </label>
            <textarea
              className="resize-y rounded-y h-10 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="ruta"
              name="ruta"
              placeholder="ruta"
              value={c6Rest}
              onChange={(e) => setc6Rest(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="procedencia"
            >
              PROCEDENCIA
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="procedencia"
              name="procedencia"
              placeholder="procedencia"
              value={c5Part1}
              onChange={(e) => setc5Part1(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="eobt"
            >
              EOBT
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="time"
              id="eobt"
              name="eobt"
              value={c5Part2}
              onChange={manejarCambioHora}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="horaDespegue"
            >
              HORA DESPEGUE
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="time"
              id="horaDespegue"
              name="horaDespegue"
              value={hora}
              onChange={manejarCambioHora}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="destProcedencia"
            >
              DEST/ PROCEDENCIA
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="destProcedencia"
              name="destProcedencia"
              placeholder="dest/procedencia"
              value={dest1}
              onChange={(e) => setDest1(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="pistaProcedencia"
            >
              RWY
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="pistaProcedencia"
              name="pistaProcedencia"
              placeholder="pista"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="calleProcedencia"
            >
              TWY
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="calleProcedencia"
              name="calleProcedencia"
              placeholder="c. rodaje"
            />
          </div>
        </div>

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
              value={c7Part1}
              onChange={(e) => setc7Part1(e.target.value)}
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
              value={dest2}
              onChange={(e) => setDest2(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="modelo"
            >
              CONTROLADOR
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"              
              id="idControladorPro"
              name="idControladorPro"
              placeholder="controlador"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="nivel"
            >
              ALTERNOS
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="alterno"
              name="alterno"
              placeholder="alterno"
              value={alterno}
              onChange={(e) => setAlterno(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="obsProcedencia"
            >
              OBSERVACION
            </label>
            <textarea
              className="resize-y rounded-y h-10 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="obsProcedencia"
              name="obsProcedencia"
              placeholder="observacion"
            />
          </div>
        </div>
        <br />

        
        <div className="flex space-x-4 ...">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={enviarUser}
            >
              REGISTRAR
            </button>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              CANCELAR
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}
export default FormMov;
