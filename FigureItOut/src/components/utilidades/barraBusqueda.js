import React from "react";
import { BsSearch } from "react-icons/bs";


const BarraBusqueda = () => (
    <form action={window.location.href+"/"} method="get">
        <div className="contenedorBusqueda">
                <label htmlFor="busqueda" className="labelBusqueda">Buscar</label>
                <input type="text" id="busqueda" className="inputBusqueda" maxLength={30} 
                placeholder="Introduce tu texto de busqueda" name="busqueda" />
                <button type="submit" className="botonNormal" id="botonBusqueda"
                value={"Buscar"}><BsSearch/></button>
        </div>
    </form>
);

export default BarraBusqueda;