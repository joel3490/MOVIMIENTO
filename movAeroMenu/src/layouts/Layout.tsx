import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { MdFlightTakeoff, MdFactCheck, MdFeed, MdOutlineContentCopy, MdFormatAlignLeft, MdPlaylistPlay } from "react-icons/md";
import ProfileMenu from "../auth/PerfilUser";

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

      <div className="absolute top-0 right-0 p-4 mt-5">
        <ProfileMenu />
      </div>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full'
          }`}
        aria-label="Sidebar"
      >
        <div className="absolute top-4 right-3 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-900 group">
          <MdFormatAlignLeft
            className="inline-flex items-center p-2 -mt-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"

            size={40}
            aria-controls="sidebar-multi-level-sidebar"
            type="button"
            onClick={toggleSidebar}
          />
        </div>

        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="mx-auto w-48 h-auto mr-32 mt-5"
          />
          <br />
          <br />
          <ul className="space-y-2 font-medium">
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdFlightTakeoff className="w-10 h-10 text-slate-600" />
              <Link to="/mov" className={`flex-1 ms-3 whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden'}`}>
                MOVIMIENTO
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdFactCheck className="w-10 h-10 text-slate-600" />
              <Link to="form004/" className={`flex-1 ms-3 whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden'}`}>
                FORM 004
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdFeed className="w-10 h-10 text-slate-600" />
              <Link to="form006/" className={`flex-1 ms-3 whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden'}`}>
                FORM 006
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdOutlineContentCopy className="w-10 h-10 text-slate-600" />
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
