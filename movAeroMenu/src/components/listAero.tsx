

export const ListAero = () => {

    const chats = [1, 2, 3, 4, 5, 6, 7]


    return (
        <>
        <div className="inbox_chat mt-14">
            {
                chats.map((chat) => (
                    <div className="chat_list" key={chat}>
                        {/* active_chat */}
                        <div className="chat_people p-2">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" alt="Neil image"></img>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Aeropuerto
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Regional
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    $320
                                </div>
                            </div>
                            <div className="chat_ib">

                                <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">OnLine</span>
                                <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">OffLine</span>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
        
        
        
        </>

    )
}
