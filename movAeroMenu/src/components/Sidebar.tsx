
import {  
  AiOutlineHome,
  AiOutlineApartment,  
} from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
export function Sidebar({ sidebarOpen }: SidebarProps) {
 
  return (
    <>      
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
     </>
  );
}
//#region Data links
const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Estadisticas",
    icon: <MdOutlineAnalytics />,
    to: "/estadisticas",
  },
  {
    label: "Productos",
    icon: <AiOutlineApartment />,
    to: "/productos",
  },
  {
    label: "Diagramas",
    icon: <MdOutlineAnalytics />,
    to: "/diagramas",
  },
  {
    label: "Reportes",
    icon: <MdOutlineAnalytics />,
    to: "/reportes",
  },
];



