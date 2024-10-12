import axios from "axios"

type LoginData = {
  id_oaci: string;
  password: string;
};

export async function login(data: LoginData) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/login`; 
    const response = await axios.post(url, data);    
    
    if (response.status === 200) {
      //console.log('Login exitoso:', response.data);
      localStorage.setItem('auth_token', response.data)
      console.log(localStorage)
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

export async function getAerouser() {
  
  const token = localStorage.getItem('auth_token')
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/aerouser`; 
    const response = await axios.get(url, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });    
    console.log(response) 
    //console.log(token)
    return response  
    
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