import { string, object, optional } from "valibot";

export const ValidarMovSchema = object({
    
    fecha: string(),
    idAvion: string(),
    modelo: string(),
    propietario: string(),
    procedencia: string(),
    destino: optional(string()),
    horaDespegue: string(),
    horaArribo: optional(string()),
    ruta: string(),
    nroVuelo: string(),
    obsProcedencia: optional(string()),
    idControladorPro: string(),
    obsArribo: optional(string()),
    idControladorArr: optional(string()),
    nivel: string(),
    eobt: string(),
    pistaProcedencia: optional (string()),
    destProcedencia: optional(string()),
    calleProcedencia: optional(string()),
    destArribo: optional(string()),
    calleArribo: optional(string()),
    pistaArribo: optional(string()),    
    estado: optional(string()),
    alterno: optional(string())
});

type MovData = {
  [key: string]: FormDataEntryValue;
};

export function validarCampos(data: MovData): string | null {
  // Definir los campos que son obligatorios
  const requiredFields = [
    "fecha",
    "idAvion",
    "procedencia",
    "horaDespegue",
    "ruta",
    "nroVuelo",
    "idControladorPro",
    "nivel",
    "eobt",
    "pistaProcedencia",
    "calleProcedencia",
  ];

  for (const field of requiredFields) {
    const value = data[field];
    
    if (typeof value === "string" && value.trim() === "") {
      return `El campo ${field} es obligatorio y no puede estar vacío.`;
    }
  }
  return null;
}


export type Mensaje = {
  id: string
  idmov: string
};

export interface Registro {

  id: string
  procedencia: string
  idAvion: string
  idControladorArr: string
  idControladorPro: string
  obsArribo: string
  nroVuelo: string
  propietario: string
  horaDespegue: string
  modelo: string
  horaArribo: string
  destProcedencia: string
  destino: string
  destArribo: string
  calleArribo: string
  pistaArribo: string
  estado: string,
  alterno: string
}