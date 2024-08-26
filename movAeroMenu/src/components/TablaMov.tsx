import React from "react";
import { getMov } from "../servicioApi/MovService";
import styled from "styled-components";

export async function loader() {
  await getMov()

  return {}
}

export default function TablaMov() {
  return (
    <>
    <form className="mb-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="BITACORA DE VUELO"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buscar bitacora
                </button>
              </div>
            </form>

            <Table className="table-auto min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">De:</th>
                  <th className="px-4 py-2">A:</th>
                  <th className="px-4 py-2">Despegue</th>
                  <th className="px-4 py-2">Arribo</th>
                  <th className="px-4 py-2">Empresa</th>
                  <th className="px-4 py-2">Punt Sal/Ent</th>
                  <th className="px-4 py-2">Obs</th>
                  <th className="px-4 py-2">ATCO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  
                </tr>
              </tbody>
            </Table>
    </>
  )
}
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;