import React, { useState } from 'react';
import { MdVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { login } from '../servicioApi/AuthService'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [id_oaci, setidoaci] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        id_oaci: id_oaci, password,
      };

      const response = await login(data)

      if (response.status === 200) {

        toast.success('Login exitoso', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }      
      //console.log('Respuesta del servidor y token:', response) // respuesta para el token de autentificacion
      //const token = response.data     

      navigate('/mov')

    } catch (error: unknown) {

      if (error instanceof Error && (error as any).response) {
        const response = (error as any).response;

        if (response.status === 404) {
          toast.error('Usuario no encontrado', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (response.status === 401) {
          toast.error('Contraseña incorrecta', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error('Error en el servidor', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
        toast.error('Error inesperado', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <section className="min-h-screen flex items-stretch text-white">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage: 'url(/img/torre.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute bg-black opacity-40 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-serif text-left tracking-wide">MOVIMIENTO DE AERONAVE</h1>
            <p className="text-3xl my-4 font-serif">Progreso de Vuelo</p>
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: '#161616' }}>
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage: 'url(/img/torre.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute bg-black opacity-40 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">

            <img
              src="/img/logo_blanco.png"
              alt="Logo"
              className="mx-auto w-96 h-auto -mt-32"
            />

            <h1 className="my-6">


              <form className="-mt-10" onSubmit={handleLogin}>
                <div className="mx-auto max-w-lg">
                  <div className="py-2">
                    <span className="px-1 text-sm text-white">AEROPUERTO</span>
                    <input
                      placeholder=""
                      type="text"
                      className="text-md text-black block px-3 py-2 rounded-lg w-full 
                                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-800 
                                focus:bg-white focus:border-gray-600 focus:outline-none"
                      name={id_oaci}
                      onChange={(e) => { setidoaci(e.target.value) }}
                    />
                  </div>
                  <div className="py-2">

                    <span className="px-1 text-sm text-white ">CONTRASEÑA</span>
                    <div className="relative">
                      <input
                        placeholder=""
                        type={showPassword ? 'text' : 'password'}
                        className="text-md text-black block px-3 py-2 rounded-lg w-full border-2 placeholder-gray-600 shadow-md 
                                  focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        name={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        {showPassword ? (
                          <MdVisibility
                            size={25}
                            className="h-6 text-gray-700 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <MdOutlineVisibilityOff
                            size={25}
                            className="h-6 text-gray-700 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}

                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">

                    <label className="block text-gray-500 font-bold my-4">
                      <input type="checkbox" className="leading-loose text-pink-600" />
                      <span className="py-2 text-sm text-white leading-snug"> Remember Me </span>
                    </label>
                    <label className="block text-gray-500 font-bold my-4">
                      <a href="#" className="cursor-pointer tracking-tighter text-gray-500 border-b-2 border-gray-200 hover:border-gray-400">
                        <span>Forgot Password?</span>
                      </a>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                  >
                    Inrgresar
                  </button>
                </div>
              </form>

            </h1>
          </div>
        </div>
      </section>
    </>
  )
}
export default Login