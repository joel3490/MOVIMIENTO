import React from "react";
import { Outlet, Link } from "react-router-dom";
import { MdFlightTakeoff, MdFactCheck, MdFeed, MdOutlineContentCopy } from "react-icons/md";



export default function Layout() {
  return (
    <>
      
     
      
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >

        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="text-3xl font-semibold p-8">NAABOL</div>
          <ul className="space-y-2 font-medium">
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <MdFlightTakeoff             
            size={35}
            />
                
                <Link
                  to="/"
                  className="flex-1 ms-3 whitespace-nowrap"
                >MOVIMIENTO
                </Link>
              
            </li>

            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <MdFactCheck 
            size={35}
            />
                
                <Link
                  to="form004/"
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  FORM 004
                </Link>
              
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <MdFeed 
            size={35}
            />
                             
                <Link
                  to="form006/"
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  FORM 006
                </Link>
              
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <MdOutlineContentCopy
            size={35}
            />
                
                <Link
                  to="fpl/"
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  FPL
                </Link>
              
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-2 sm:ml-64">
        <div className="p-2 border-spacing-8  border-gray-600 border-dashed rounded-lg dark:border-gray-950">
          <Outlet />
        </div>
      </div>
    </>
  );
}
