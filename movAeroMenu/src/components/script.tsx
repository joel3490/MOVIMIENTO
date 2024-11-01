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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarCampos } from "../types/MovServices";
import { Prueba } from "./ConexionSocket";
import { ChatContext, useChatContext } from "./chatContext";
import { types  } from "../types/SocketServices";
import { SocketContext } from "./SocketContext";

export async function action({ request }: ActionFunctionArgs) {
  const f = await request.formData();
  const data: { [key: string]: any } = {};

  f.forEach((value, key) => {
    data[key] = value;
  });

  const validationError = validarCampos(data);

  //await crearMov(data);
  // const nuevoId = await crearMov(data);
  if (validationError) {
    toast.error(validationError);
    return null;
  }

  try {
    const nuevoId = await crearMov(data);
    console.log(nuevoId)
    toast.success("Se envió el vuelo" );

    

    return redirect("/mov");
  } catch (error) {
    toast.error("Ocurrió un error al crear el movimiento." );
    return null;
  }

  //console.log(data) para ver q llegue los datos hasta ahi

  //console.log('desde el formulario', nuevoId);
}

 function FormMov() {
  
  
  

  const context = useContext(ChatContext);

  // Comprueba que el contexto no sea undefined
  if (!context) {    throw new Error("TuFormulario debe estar dentro de un ChatProvider");  }
  const { dispatch } = context;


  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    console.error('El contexto de socket no está disponible');
    return null;
  }

  const { socket, online } = socketContext;

  const { stateSocket } = useChatContext();
    const { userAuth } = stateSocket;  

  const enviarUser = () => {
    if (c7Part1) {
      dispatch({
        type: types.activarChat,
        payload: c7Part1, // Envía el uid al contexto
      });
      console.log("Usuario enviado al contexto:", c7Part1); // Depuración

      /* if (socket && online) {
        socket.emit('enviarMov', {
          
          destino: c7Part1,
          procedencia: userAuth?.id_oaci,
          mensaje:'id'
        });
        console.log('Evento emitido: enviarMov');
      } else {
        console.error('Socket no conectado o fuera de línea');
      }
 */



      
    } else {
      console.log("c7Part1 está vacío");
    }
  };



  

  
    
  

  const location = useLocation();
  

  const error = useActionData() as string;

  
  const [c5Part1, setc5Part1] = useState("");
  const [c5Part2, setc5Part2] = useState("");

 

  

  const [c7Part1, setc7Part1] = useState("");
  
  //sacar la matricula de c8
 
 
  //sacar el destino para ZZZZ
  const [dest1, setDest1] = useState("");
  const [dest2, setDest2] = useState("");
  

  

  return (
    <>
      <Prueba />

      <ToastContainer />

      {error && <ErrorMensaje mensaje={error} />}

      <Form method="POST" className="w-full max-w-lg">
        

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

/* import React, { useContext } from 'react';
import { SocketContext } from './SocketContext';
import { crearMov } from "../servicioApi/MovService";
import { validarCampos } from '../types/MovServices';
import { ActionFunctionArgs } from 'react-router-dom';

export default async function Script({ request }: ActionFunctionArgs) {
 
  const data: { [key: string]: any } = {};
  const f = await request.formData();
  f.forEach((value, key) => {
    data[key] = value;
  });

  const nuevoId = await crearMov(data);
    console.log(nuevoId)

  const validationError = validarCampos(data);
 
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    console.error('El contexto de socket no está disponible');
    return null;
  }

  const { socket, online } = socketContext;

  const enviarUser = () => {
    if (socket && online) {
      socket.emit('enviarMov', {
        id: socket.id,
        idmov: 'nuevoId',
      });
      console.log('Evento emitido: enviarMov');
    } else {
      console.error('Socket no conectado o fuera de línea');
    }
  };

  return (
    <button onClick={enviarUser} className="text-lime-700">
      Enviar
    </button>
  );
}
 */