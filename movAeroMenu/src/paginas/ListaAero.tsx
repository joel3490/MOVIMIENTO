
import { ListAero } from "../components/listAero";


export function ListaAero() {
  return (

    <>
    <div className="flex justify-center items-center -mt-11">
      <p className="italic font-black text-3xl">AEROPUERTOS EN LINEA</p>
    </div>
    
    <div className="messaging">
      <div className="inbox_msg">
        <ListAero/>
      </div>      
    </div>

    </>
  );
}
