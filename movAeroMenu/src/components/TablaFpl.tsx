import React, { useState } from 'react'
import { getFpl, fplBuscar } from '../servicioApi/FplService'
import styled from "styled-components"
import { useLoaderData, useNavigate } from 'react-router-dom'
import FplDetalles from './FplDetalles'
import ReactPaginate from 'react-paginate'
import { fpl } from '../types/FplServices'
 


export async function loader() {
    const Fpls =  await getFpl()   
    return Fpls
}


const ITEMS_PER_PAGE = 8

export default function TablaFpl() {
    const initialFpls  = useLoaderData() as fpl[]
    const [fpls, setFpls] = useState<fpl[]>(initialFpls)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")

    
    
    const [selectedFpl, setSelectedFpl] = useState<fpl | null>(null);
    const navigate = useNavigate()

    
    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected)
    };
    const offset = currentPage * ITEMS_PER_PAGE
    const currentItems = fpls.slice(offset, offset + ITEMS_PER_PAGE)
    const pageCount = Math.ceil(fpls.length / ITEMS_PER_PAGE)

    const handleSelect = (selectedFpl: fpl) => {
     //console.log('Registro seleccionado en TablaFpl:', selectedFpl);
      setSelectedFpl(selectedFpl)
        
      navigate('/mov', { state: { selectedFpl } })
  }

  const handleSelectClick = async () => {
    const result = await fplBuscar(searchTerm);
    if (result) {
        setFpls(result)
        setCurrentPage(0)
    }
};

 
    //console.log("Valor de búsqueda:", searchTerm)
    
  return (
    <>
    <form className="mb-1" >
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
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="MATRICULA O NRO DE VUELO"
            required
        />
        <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSelectClick}
        >
            Buscar plan de vuelo
        </button>
    </div>
</form>

            <Table className="table-auto min-w-full">
              <thead>
                <tr>
                  
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Registro</th>
                  <th className="px-4 py-2">Modelo</th>
                  <th className="px-4 py-2">De:</th>
                  <th className="px-4 py-2">A:</th>
                  <th className="px-4 py-2">alternos</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((fpls, index) => (
                    <FplDetalles key={fpls.id || index} fpls={fpls} index={index} onSelect={handleSelect}/>
                  ))
                }
                
              </tbody>
            </Table>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 py-2 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => handlePageClick({ selected: currentPage - 1 })}
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => handlePageClick({ selected: currentPage + 1 })}
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs text-gray-700">
                        Total <span className="font-medium">1</span> a <span className="font-medium">10</span> de{' '}
                        <span className="font-medium">97</span> resultado
                    </p>
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"relative inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"isolate inline-flex -space-x-px rounded-md shadow-sm"}
                        pageClassName={"relative inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                        activeClassName={"relative z-10 inline-flex items-center bg-indigo-600 px-2 py-1 text-xs font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                        previousClassName={"relative inline-flex items-center rounded-l-md px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                        nextClassName={"relative inline-flex items-center rounded-r-md px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                        pageLinkClassName={"inline-flex items-center px-2 py-1"}
                        breakLinkClassName={"inline-flex items-center px-2 py-1"}
                        previousLinkClassName={"inline-flex items-center px-2 py-1"}
                        nextLinkClassName={"inline-flex items-center px-2 py-1"}
                    />
                </div>
            </div>
        </div>
    </>
  )
}
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
