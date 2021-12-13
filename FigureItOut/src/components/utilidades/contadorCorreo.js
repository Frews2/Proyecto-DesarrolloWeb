import React, {Component} from "react";

import { servicioReenviarCorreo } from "../../servicios/servicioSesion.js";

const SEGUNDOS_CONTADOR=10;

export class ContadorCorreo extends Component
{
    async reenviar(e)
    {
        e.preventDefault();
        
        if(sessionStorage.getItem('correo') !== null)
        {
            servicioReenviarCorreo()
            .then(data=>
            {
                if(data.exito)
                {
                    alert(data.mensaje);
                    window.location.reload();
                }
                else
                {
                    window.location.reload();
                    alert("Error: "+data.mensaje);
                }
            }).catch(error => {
                console.log(error);
            })
        }
        else
        {
            alert("No se cuenta con ningun correo para validar, inicie sesion");
            window.location.href ="/"
        }
    }

    render()
    {

        var downloadTimer = setInterval(function()
        {
            if(SEGUNDOS_CONTADOR <= 0)
            {
                clearInterval(downloadTimer);
                document.getElementById("botonReenvio").disabled = false;
                document.getElementById("contador").innerHTML ="";
                
            } 
            else 
            {
                document.getElementById("contador").innerHTML = "Espere "+ SEGUNDOS_CONTADOR + " segundos para reenviar correo";
            }
            
            SEGUNDOS_CONTADOR -= 1;

        }, 1000);
        
        return(
            <form onSubmit={(e)=>this.reenviar(e)}>
                <div className="etiquetaContador">
                    <p id="contador"></p>
                    <button id="botonReenvio" type="submit" className="botonNormal" disabled 
                    >Reenviar Correo</button>
                </div>
            </form>
        );
    }

}