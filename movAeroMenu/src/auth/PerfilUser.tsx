import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdHelp } from "react-icons/md";
import { getAerouser } from "../servicioApi/AuthService"
import { useNavigate } from "react-router-dom";

const ProfileMenu: React.FC = () => {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['id_oaci'],
    queryFn: getAerouser,
    retry: 1,
    refetchOnWindowFocus: true
  });

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('auth_token')
    queryClient.invalidateQueries({ queryKey: ['user'] })
    navigate('/')
  }

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

      <div className="relative inline-flex items-center justify-center w-16 h-16   overflow-hidden bg-gray-300 rounded-full dark:bg-gray-800">
        <span className="font-medium text-gray-600 dark:text-gray-300 text-2xl" >{data?.data?.id_oaci}</span>
      </div>

      <div className="font-medium dark:text-white">
        <div>{data?.data?.aeropuerto}</div>
      </div>

      {isHovered && (
        <ul
          role="menu"
          className="absolute right-0 z-10 min-w-[180px] -mt-1 overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm focus:outline-none"
        >
          <li
            role="menuitem"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            <p className="text-slate-800 font-medium ml-2">Regional {data?.data?.regional}</p>
          </li>
          <li
            role="menuitem"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            <p className="text-slate-800 font-medium ml-2">{data?.data?.nombre}</p>
          </li>
          <button
            type="button"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            onClick={logout}
          >
            <MdHelp className="w-5 h-5 text-red-700" />
            <p className="text-red-700 font-medium ml-2">Cerrar Sesion</p>
          </button>
        </ul>
      )}
    </div>
  );
};
export default ProfileMenu;