import { createBrowserRouter, LoaderFunctionArgs  } from "react-router-dom";
import AuthLayout  from "../layouts/authLayout";
import Login from "../auth/Login"
import { Home } from "../paginas/Home";
import { Estadisticas } from "../paginas/Estadisticas";
import { Productos } from "../paginas/Productos";
import {Diagramas} from "../paginas/Diagramas";
import {Reportes} from "../paginas/Reportes";
import React from "react";
import Layout from "../layouts/Layout";
import { action as createMov } from "../components/formMov";
import {loader as fplLoader} from '../components/TablaFpl'
import { loader as movLoader } from "../components/TablaMov";

export const combinedLoader = async (args: LoaderFunctionArgs) => {
  //const fplData = await fplLoader(args);
  //const movData = await movLoader(args);

  return {
    //fplData,
    //movData,
  };
};

export const router = createBrowserRouter([
  {
    
    element: <AuthLayout />,
    children: [
      {                
        path: '/',
        element: <Login />,
      },
      {
        //path: 'register',
        //element: <Register />,
      }
    ]
  },
  {    
    path: '/mov',
    element:<Layout />,
    children:[
      {
        index: true,
        element: <Home/>,
        action: createMov,
        loader: fplLoader,
      },
      {
        path: 'form004/',
        element:<Estadisticas/>
      },
      {
        path: 'form006/',
        element:<Productos/>
      },
      {
        path: 'fpl/',
        element:<Reportes/>
      }
    ]    
  }
  
])

