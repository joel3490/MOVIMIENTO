import { useState, useRef, useEffect } from 'react';
import { FplsDetalleProps } from '../types/FplServices';



export default function FplDetalles({ fpls, onSelect }: FplsDetalleProps) {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const getFirst = (str: string) => {
        return str.split(' ')[0];
    }

    const getRemaining = (str: string) => {
        return str.split(' ').slice(1).join(' ');
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])
    
    const handleSelectClick = () => {
        
    //console.log('Registro seleccionado:', fpls);
       
        onSelect (fpls)
    }

    return (
        <tr 
        className="hover:bg-blue-100"
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 20 }}
        >
            <td>{formatDate(fpls.fechaHora)}</td>
            <td>{fpls.c1}
            <div className="relative">
                {isOpen && (
                        <div
                            ref={popoverRef}
                            className="absolute z-10 w-96 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                            style={{ top: '100%', left: '0%' }}
                        >
                            <div className="px-3 py-2 bg-gray-400 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Registro</h3>
                            </div>
                            <div className="px-3 py-2">
                            {fpls.c2}
                                <br />
                                <br />
                                {fpls.c4}
                                <br />
                                <br />
                                {fpls.c6}
                                <br />
                                <br />
                                {fpls.c8}
                            </div>
                            <div data-popper-arrow></div>
                        </div>
                    )}
                </div>
            </td>
            <td>{fpls.c3}</td>
            <td>{fpls.c5}</td>
            <td>{getFirst(fpls.c7)}</td>
            <td>{getRemaining(fpls.c7)}</td>
            <td>
                <div className="relative">
                    <button
                        
                        type="button"
                        className="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSelectClick}
                    >
                        Seleccionar
                    </button>
                    
                </div>
            </td>
        </tr>
    );
}
