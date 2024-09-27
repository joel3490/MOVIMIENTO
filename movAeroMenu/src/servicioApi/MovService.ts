import { validarCampos, ValidarMovSchema } from '../types/MovServices'
import { safeParse } from "valibot"
import axios from "axios"

type MovData = {
    [k: string]: FormDataEntryValue
}
type LoginData = {
  id_oaci: string;
  password: string;
};

export async function login(data: LoginData) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/login`; 
    const response = await axios.post(url, data);
    
    
    if (response.status === 200) {
      console.log('Login exitoso:', response.data);
      return response.data;  
    } else {
      throw new Error('Login fallido');
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Error en el servidor:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;  
  }
}

export async function crearMov(data: MovData) {
  try {
    const error = validarCampos(data)
    if (error) {
      console.error(error)
      return
    }

    const result = safeParse(ValidarMovSchema, data)
    console.log(result)
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/mov/crearMov`
      const response= await axios.post(url, result.output)
      const nuevoId = response.data.id;
      //console.log('ID del nuevo movimiento desde el servicio:', nuevoId);
      return nuevoId
    } else {
      throw new Error('Datos no válidos')
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data)
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request)
    } else {
      console.error('Error:', error.message)
    }
  }
}

export async function updateMov(id: string, data: MovData) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/mov/${id}`
    const response = await axios.put(url, data)
    console.log('Actualización exitosa:', response.data)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error al actualizar el movimiento:', error.response?.data || error.message)
    } else {
      console.error('Error inesperado:', error.message)
    }
    throw error
  }
}

export async function getMovById(id: string) {
  try {
      const url = `${import.meta.env.VITE_API_URL}/mov/${id}` 
      const { data } = await axios.get(url)
      console.log(data)
      return data
  } catch (error: any) {
      if (axios.isAxiosError(error)) {
          console.error('Error al obtener el movimiento:', error.response?.data || error.message);
      } else {
          console.error('Error inesperado:', error.message);
      }
      throw error; 
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