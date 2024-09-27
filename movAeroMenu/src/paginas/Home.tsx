import styled from "styled-components";
import React from "react";
import NotMov from "../components/notMov";
import Tabless from "../components/Tabless";
import FormMov from "../components/formMov";
import { FechaHora } from "../components/FechaMov";

export function Home() {
  return (<Container>
    <div className="flex justify-center items-center -mt-11">
      <p className="italic font-black text-3xl">MOVIMIENTO DE AERONAVE</p>
    </div>

<br />

    <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2">
      <div className="mt-2">
        <FechaHora />

      </div>
      <div className="-mt-9" >
        <NotMov />
      </div>
    </div>
    <br />
    <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-3">
      <div className=" md:col-span-1">
        <FormMov />
      </div>
      <div className=" overflow-x-auto text-left md:col-span-2 w-full max-w-full -mt-20">
        <Tabless />
      </div>
    </div>


  </Container>);
}
const Container = styled.div`
  height:100vh;
`