import React, {Component} from "react";
import { BsSearch } from "react-icons/bs";

var segundosContador=10;
export class ContadorCorreo extends Component
{
    async reenviar(e)
    {
        if(sessionStorage.getItem('correo') !== null)
        {
            e.preventDefault();
            fetch("http://localhost:4000/codigos/enviarCorreo", 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({
                    Correo: (sessionStorage.getItem('correo')),
                })
            })
            .then(response=> response.json())
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

    render(){

        var downloadTimer = setInterval(function()
        {
            if(segundosContador <= 0)
            {
                clearInterval(downloadTimer);
                document.getElementById("botonReenvio").disabled = false;
                document.getElementById("contador").innerHTML ="";
                
            } 
            else 
            {
                document.getElementById("contador").innerHTML = "Espere "+ segundosContador + " segundos para reenviar correo";
            }
            
            segundosContador -= 1;

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