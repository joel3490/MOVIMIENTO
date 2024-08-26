import { createBrowserRouter, LoaderFunctionArgs  } from "react-router-dom";
import { Home } from "../pages/Home";
import { Estadisticas } from "../pages/Estadisticas";
import { Productos } from "../pages/Productos";
import {Diagramas} from "../pages/Diagramas";
import {Reportes} from "../pages/Reportes";
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
    path: '/',
    element:<Layout/>,
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