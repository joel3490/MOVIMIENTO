import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { MdFlightTakeoff, MdFactCheck, MdFeed, MdOutlineContentCopy, MdFormatAlignLeft,MdPlaylistPlay   } from "react-icons/md";



export default function Layout() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  
  return (
    <>   
     <MdPlaylistPlay
        size={45}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        onClick={toggleSidebar}
      />
          
     <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="absolute top-4 right-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <MdFormatAlignLeft
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        
            size={45}
            aria-controls="sidebar-multi-level-sidebar"
            type="button"
            onClick={toggleSidebar}
          />
        </div>

        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="text-3xl font-semibold p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            NAABOL
          </div>
          <br />
          <br />
          <ul className="space-y-2 font-medium">
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdFlightTakeoff size={35} />
              <Link to="/" className={`flex-1 ms-3 whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden'}`}>
                MOVIMIENTO
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdFactCheck size={35} />
              <Link to="form004/" className={`flex-1 ms-3 whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden'}`}>
                FORM 004
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdFeed size={35} />
              <Link to="form006/" className={`flex-1 ms-3 whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden'}`}>
                FORM 006
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdOutlineContentCopy size={35} />
              <Link to="fpl/" className={`flex-1 ms-3 whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden'}`}>
                FPL
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className={`p-2 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <div className="p-2 border-spacing-8 border-gray-600 border-dashed rounded-lg dark:border-gray-950">
          <Outlet />
        </div>
      </div>
    </>
  );
}
