import React, {Component} from "react";

import { servicioComentarPublicacion } from "../../servicios/servicioPublicacion.js";


let queryString = window.location.search;
let urlParametros = new URLSearchParams(queryString);

const ID_REVIEW = urlParametros.get('id');
const LONGITUD_MINIMA_COMENTARIO = 4;
const LONGITUD_MAXIMA_COMENTARIO = 49;
const REGEX_ESPACIODOBLE=/ +(?= )/g;
const REGEX_ESPACIOBLANCO=/\s/g;
const COMENTARIO_FORM = new FormData();


export class CrearComentario extends Component
{
    state=
    {
        disabled:true,
        form:
        {
            Comentario:'',
        }
    }
    
    validarTexto()
    {
        if(this.state.form.Comentario.length > LONGITUD_MINIMA_COMENTARIO &&
            this.state.form.Comentario.length < LONGITUD_MAXIMA_COMENTARIO &&
            this.state.form.Comentario.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA_COMENTARIO)
        {
            return true;
        }
        return false;
    }

    handleChange=async e=>
    {
        await this.setState({
             form:
             {
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

    

    async comentarPublicacion(e)
    {
       e.preventDefault();
       if(this.validarTexto() === true )
       {
            COMENTARIO_FORM.append('Texto',this.state.form.Comentario.replace(REGEX_ESPACIODOBLE,''));
            COMENTARIO_FORM.append('IdPublicacionOriginal',ID_REVIEW);

           servicioComentarPublicacion(COMENTARIO_FORM)
           .then(data=>
            {
                if(data.exito === true)
                {
                    alert(data.mensaje);
                    window.location.reload();
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
            
            <div className="formGeneral">
                <form onSubmit={(e)=>this.comentarPublicacion(e)}>
                    
                <div className="form-group">
                    <label htmlFor="realizarComentario">Realizar un comentario:</label>
                    <input id="realizarComentario" className="form-control" placeholder="Realiza un comentario" minLength={5} 
                    maxLength="50" name="Comentario"  onChange={this.handleChange} required/>
                </div>
                    <button type="submit" className="botonNormal" disabled={this.state.disabled} >Subir comentario</button>
                </form>
            </div>
        );
    }

}