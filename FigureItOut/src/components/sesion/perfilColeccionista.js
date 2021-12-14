import React, {Component} from "react";

import { servicioValidarColeccionista } from "../../servicios/servicioSesion.js";


export class PerfilColeccionista extends Component{
    render()
    {
        function checarSesion()
        {
            if(typeof window !== 'undefined')
            {
                servicioValidarColeccionista()
                .then(exito => {
                    if(exito === false)
                    {
                        window.location.pathname = '../';
                    }
                }).catch(error => {
                    window.alert("Ocurrió un error");
                    console.error(error);
                    window.location.pathname = '../';
                }) 
            }
        }
        return(
            <div onLoad={checarSesion()}>
                <div>
                  <h1 className='tituloPublicacion'>Bienvenido Coleccionista</h1>
                </div>

                <div className="inicioCerrarSesion">
                    <button type="submit" className="botonNormal"  onClick={function(e) 
                    {
                        window.location.href="../reviews/subirReview"    
                    }} >Subir Review</button>
                    <button type="submit" className="botonNormal" onClick={function(e) {
                        sessionStorage.setItem('token',null);
                        window.location.href="../"    
                    }} >Cerrar sesion</button>
                </div>
            </div>
        );
    }
}