import { useState } from "react";
import React from "react";
import { MdFlight } from "react-icons/md";

function NotMov() {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className="flex justify-end relative pr-10">
      <MdFlight 
      size={50}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 20 }}
      />
       
        {isHovered && (
          <div
            id="carrito"
            className="absolute top-12 right-0 bg-white p-6 shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ zIndex: 30 }} // Asegúrate de que el z-index sea mayor que el del formulario
          >
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">PROCEDENCIA</th>
                  <th className="text-left px-4 py-2">MATRICULA</th>
                  <th className="text-left px-4 py-2">CONTROLADOR</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">SLLP</td>
                  <td className="px-4 py-2">CP3119</td>
                  <td className="px-4 py-2">JOEL</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      type="button"
                    >
                      Recibir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
export default NotMov;
