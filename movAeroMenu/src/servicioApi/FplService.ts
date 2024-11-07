import { FplsSchema } from '../types/FplServices'
import { safeParse } from "valibot"
import axios from "axios"
import {jwtDecode} from "jwt-decode";

function getUserOaci() {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            return decoded.id_oaci; // Asegúrate de que `id_oaci` esté en el token
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }
    return null;
}



export async function getFpl() {
    const token = localStorage.getItem('auth_token') 
    const userIdOaci = getUserOaci(); 
    try {
        const url = `${import.meta.env.VITE_API_URL}/fpl?id_oaci=${encodeURIComponent(userIdOaci)}`
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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
    const token = localStorage.getItem('auth_token') 
    const userIdOaci = getUserOaci();   
    //console.log('Valor de búsqueda:', searchTerm);
    try {
        let url: string;
        if (!searchTerm.trim()) {
            // Si está vacío, usa la URL para traer todos los registros
            url = `${import.meta.env.VITE_API_URL}/fpl?id_oaci=${encodeURIComponent(userIdOaci)}`;
        } else {
            // Si no está vacío, usa la URL para buscar el término
            url = `${import.meta.env.VITE_API_URL}/fpl/search?id_oaci=${encodeURIComponent(userIdOaci)}&fplBuscar=${encodeURIComponent(searchTerm)}`;
        }
        // Realiza la solicitud GET
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // Muestra los datos recibidos en la consola
        console.log('Resultado de la búsqueda:', data)
        const result = safeParse(FplsSchema, data.data)
        if (result.success){
            return result.output
        }else{
            throw new Error('Hubo un error ....')
        }   
        //return data; // Opcional: si necesitas devolver los datos para otros usos
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Error al buscar el FPL:', error);
    }
    
}

