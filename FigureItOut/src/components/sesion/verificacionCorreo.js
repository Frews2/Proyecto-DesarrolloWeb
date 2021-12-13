import React, {Component} from "react";

import { servicioValidarCorreo } from "../../servicios/servicioSesion.js";

const REGEX_NUMERO=/^[0-9]+$/;
const REGEX_ESPACIOBLANCO=/\s/g;
const LONGITUD_CODIGO=5;
const LONGITUD_MINIMA = 4;

export class VerificacionCorreo extends Component 
{
    state=
    {
        disabled:true,
        form:
        {
            codigoVer:''
        }
    }
    
    validacionGeneral()
    {
        if(this.state.form.codigoVer.length == LONGITUD_CODIGO && 
        this.state.form.codigoVer.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA
        && this.state.form.codigoVer.match(REGEX_NUMERO))
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
        if(this.validacionGeneral() === true)
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
    
    async verificar(e)
    {
        e.preventDefault();
        if(this.validacionGeneral() === true)
        {
            if(sessionStorage.getItem('correo')!= null)
            {
               
                let datosVerificacion = JSON.stringify({
                        Correo: (sessionStorage.getItem('correo')),
                        Numero: this.state.form.codigoVer
                    })

                servicioValidarCorreo(datosVerificacion)
                .then(data=>{
                    if(data.exito)
                    {
                        alert(data.mensaje);
                        alert("Favor de iniciar sesion con su cuenta verificada");
                        sessionStorage.setItem('correo',null);
                        window.location.pathname = '/';
                    }
                    else
                    {
                        alert(data.mensaje);
                    }
                }).catch(error => {
                    alert("Ocurrió un error");
                    console.error(error)
                })
            }
            else
            {
                alert("Aun no ha echo login para verificar un correo");
            }
        }
        else
        {
            alert("Error en el campo, verifique que solo sean 5 numeros sin espacios");
        }
    }

    render() 
    {
        function checarSesion()
        {
            if(sessionStorage.getItem('correo') === null || sessionStorage.getItem('token') !== null)
            {
                window.location.pathname = '/'
            }
        }

        return (
            <div onLoad={checarSesion()} >
                <form onSubmit={(e)=>this.verificar(e)}>
                    <div className="formGeneral">
                        <h2>Valida Correo</h2>

                        <div className="form-group">
                            <label>Codigo de verificacion</label>
                            <input type="number" className="form-control" id="numeroEntrada" placeholder="Introduce el codigo"
                            name="codigoVer" onChange={this.handleChange} required/>
                        </div>

                        <div className="form-end">
                            <button type="submit" className="botonNormal" disabled={this.state.disabled}>Acceder</button>
                            <p>Para terminar tu registro ingresa el codigo de 5 digitos que se te envio a tu correo</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}