import React, {Component} from "react";

import { servicioValidarPeriodista } from "../../servicios/servicioSesion.js";

export class PerfilPeriodista extends Component{
    render()
    {
        function checarSesion()
        {
            if(typeof window !== 'undefined')
            {
                if(sessionStorage.getItem('token') !== null)
                {
                    servicioValidarPeriodista()
                    .then(exito => {
                        if(exito === false)
                        {
                            window.location.pathname = '/';
                        }
                    }).catch(error => {
                        window.alert("Ocurrió un error");
                        console.error(error);
                        window.location.pathname = '/';
                    }) 
                }
            }
        }
        return(
            <div onLoad={checarSesion()}>
                <div>
                  <h1 className='tituloPublicacion'>Bienvenido Periodista</h1>
                </div>

                <div className="inicioBotones">
                    <button type="submit" className="botonNormal"  onClick=
                    {function(e) 
                    {
                        window.location.href="/noticias/subirNoticia"    
                    }} >Subir Noticias</button>

                    <button type="submit" className="botonNormal" onClick=
                    {function(e) 
                    {
                        window.location.href="/figuras/subirFigura"    
                    }} >Subir Figura</button>
                </div>

                <div className="inicioCerrarSesion">
                    <button type="submit" className="botonNormal" onClick=
                    {function(e) 
                    {
                        sessionStorage.removeItem('token');
                        window.alert("Hasta pronto");
                        window.location.href="/"    
                    }} >Cerrar sesion</button>
                </div>
            </div>
        );
    }
}