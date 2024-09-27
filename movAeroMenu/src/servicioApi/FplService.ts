import { FplsSchema } from '../types/FplServices'
import { safeParse } from "valibot"
import axios from "axios"


export async function getFpl() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/fpl`
        const {data} = await axios(url)
        const result = safeParse(FplsSchema, data.data)
        if (result.success){
            return result.output
        }else{
            throw new Error('Hubo un error ....')
        }        
    } catch (error) {
        
    }
}



export async function fplBuscar (searchTerm: string) {
    
    //console.log('Valor de búsqueda:', searchTerm);
    try {
        let url: string;
        if (!searchTerm.trim()) {
            // Si está vacío, usa la URL para traer todos los registros
            url = `${import.meta.env.VITE_API_URL}/fpl`;
        } else {
            // Si no está vacío, usa la URL para buscar el término
            url = `${import.meta.env.VITE_API_URL}/fpl/search?fplBuscar=${encodeURIComponent(searchTerm)}`;
        }
        // Realiza la solicitud GET
        const { data } = await axios.get(url);
        
        // Muestra los datos recibidos en la consola
        console.log('Resultado de la búsqueda:', data)
        const result = safeParse(FplsSchema, data.data)
        if (result.success){
            return result.output
        }else{
            throw new Error('Hubo un error ....')
        }   
        
        return data; // Opcional: si necesitas devolver los datos para otros usos
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Error al buscar el FPL:', error);
    }
    
}

