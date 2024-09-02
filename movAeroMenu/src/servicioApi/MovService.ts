import { validarCampos, ValidarMovSchema } from '../types/MovServices'
import { safeParse, undefined } from "valibot"
import axios from "axios"

type MovData = {
    [k: string]: FormDataEntryValue
}

export async function crearMov(data: MovData) {
  try {
    const error = validarCampos(data);
    if (error) {
      console.error(error);
      return; // Detener si hay un error
    }

    const result = safeParse(ValidarMovSchema, data);
    console.log(result)
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/mov/crearMov`;
      const response= await axios.post(url, result.output);

      const nuevoId = response.data.id;
      //console.log('ID del nuevo movimiento desde el servicio:', nuevoId);
      return nuevoId

    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

export async function getMov() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/mov`
        const {data} = await axios(url)
        console.log(data)
    } catch (error) {
        
    }
}