import React, {Component} from "react";
import { BsFillFlagFill } from "react-icons/bs";

import { servicioReportarPublicacion } from "../../servicios/servicioPublicacion.js";


let queryString = window.location.search;
let urlParametros = new URLSearchParams(queryString);
const ID_REVIEW = urlParametros.get('id');
const LONGITUD_MINIMA_REPORTE = 4;
const LONGITUD_MAXIMA_REPORTE = 49;
const REGEX_ESPACIODOBLE=/ +(?= )/g;
const REGEX_ESPACIOBLANCO =/\s/g;
const REPORTE_FORM = new FormData();

export class CrearReporte extends Component
{
    state=
    {
        disabled:true,
        form:
        {
            Reporte:'',
        }
    }
    
    validarTexto(textoValidar)
    {
        if(textoValidar.length > LONGITUD_MINIMA_REPORTE &&
            textoValidar.length < LONGITUD_MAXIMA_REPORTE &&
            textoValidar.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA_REPORTE)
        {
            return true;
        }
        return false;
    }

    handleChange=async e=>
    {
        await this.setState({
             form:{
                 ...this.state.form,
                 [e.target.name]: e.target.value
             },
         });
         if(this.validarTexto() === true)
         {
                 this.setState({
                     disabled: false
                 });
         }
         else
         {
             this.setState({
                 disabled: true
             });
         }
     }

    

    async reportarPublicacion(e)
    {
        e.preventDefault();
        let razonReporte = prompt("Ingrese las razones de su reporte","");
       
        if(this.validarTexto(razonReporte) === true )
        {
            REPORTE_FORM.append('Razon',razonReporte.replace(REGEX_ESPACIODOBLE,''));
            REPORTE_FORM.append('IdPublicacion',ID_REVIEW);
            REPORTE_FORM.append('TipoPublicacion', this.props.tipo);

            servicioReportarPublicacion(REPORTE_FORM)
           .then(data=>
            {
                if(data.exito === true)
                {
                    alert(data.mensaje);
                    window.location.href="/";
                }
                else
                {
                    alert(data.mensaje);
                    data.resultado.forEach(error => {
                        alert(error.msg);
                    });
                }
            }).catch(error => {
                alert("Ocurrió un error");
                console.error(error)
            })
       }
    }

    render()
    {
        return(
            
            <div className="contenedorReporte">
                <form onSubmit={(e)=>this.reportarPublicacion(e)}>
                    <button type="submit" className="botonReporte" id="botonBusqueda"><BsFillFlagFill/></button>
                </form>
            </div>
            );
    }

}