import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

export function Productos() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <h1>Productos</h1>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
}

