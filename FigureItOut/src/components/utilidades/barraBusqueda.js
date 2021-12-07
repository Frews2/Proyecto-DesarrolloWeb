import React, {Component} from "react";

const BarraBusqueda = () => (
    <form action={window.location.href+"/"} method="get">
        <div className="contenedorBusqueda">
                <input type="text" id="buscador" className="inputBusqueda" maxLength={30} placeholder="Introduce tu texto de busqueda" name="busqueda" />
                <button type="submit" className="botonNormal" id="botonBusqueda">Buscar</button>
        </div>
    </form>
);

export default BarraBusqueda;