import { useEffect } from "react";
import { useChatContext } from "./chatContext";

export const ListAero = () => {

    const { stateSocket } = useChatContext();
    const { aeroUser, userAuth } = stateSocket;   
    

    useEffect(() => {
        //console.log('Usuario autenticado:', userAuth?.id_oaci);
      }, [userAuth]);
    
      if (!userAuth) {
        return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras userAuth es null o undefined
      }

    return (        
            <div className="inbox_chat mt-14">
                {
                    aeroUser
                    .filter((user) => user.id_oaci !== userAuth.id_oaci) 
                    /* .filter((user) => {
                        console.log('Comparando:', user.id_oaci, 'con', userAuth.id_oaci);
                        return String(user.id_oaci) !== String(userAuth.id_oaci);
                      }) */
                    .map((user) => (
                        <div className="chat_list" key={user.id_oaci}>
                            
                            <div className="chat_people p-2">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="relative inline-flex items-center justify-center w-12 h-12   overflow-hidden bg-gray-300 rounded-full dark:bg-gray-800">
                                        <span className="font-medium text-gray-600 dark:text-gray-300 text-lg" >{user.id_oaci}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {user.nombre}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Regional: {user.regional}
                                        </p>
                                    </div>                                    
                                </div>
                                <div className="chat_ib">
                                    {
                                        (user.online)
                                        ?<span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">OnLine</span>
                                        :<span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">OffLine</span>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
    )
}
