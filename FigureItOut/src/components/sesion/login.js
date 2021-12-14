import React, {Component} from "react";
import { servicioLogin } from "../../servicios/servicioSesion";
import { servicioValidarPeriodista } from "../../servicios/servicioSesion";
import { servicioValidarColeccionista } from "../../servicios/servicioSesion";

const REGEX_MAIL=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_ESPACIOBLANCO=/\s/g;
const REGEX_ESPACIODOBLE=/ +(?= )/g;
const LONGITUD_MINIMA=5;
const LONGITUD_MAXIMA_CONTRASENIA=20;
const LONGITUD_MAXIMA_CORREO=50;

export class Login extends Component
{
    state={
        disabled:true,
        form:{
            email:'',
            password:''
        }
    }

    validacionGeneral()
    {
        if(this.state.form.email.length >=LONGITUD_MINIMA && this.state.form.password.length >LONGITUD_MINIMA && 
        this.state.form.email.length < LONGITUD_MAXIMA_CORREO && this.state.form.password.length< LONGITUD_MAXIMA_CONTRASENIA && 
        REGEX_MAIL.test(this.state.form.email) && this.state.form.email.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA && 
        this.state.form.password.replace(REGEX_ESPACIOBLANCO,"").length >LONGITUD_MINIMA )
        {
            return true;
        }
        return false
    }

    handleChange=async e=>
    {
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        if(this.validacionGeneral() === true){
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

    async login(e) 
    {
        e.preventDefault();
        if(typeof window !== "undefined")
        {
            let datosLogin = JSON.stringify({
                Email: this.state.form.email.replace(REGEX_ESPACIODOBLE,''),
                Password: this.state.form.password
                });

            servicioLogin(datosLogin)
            .then(data => {
                if(data.exito === true)
                {
                    if(data.resultado === null)
                    {
                        sessionStorage.setItem('correo',this.state.form.email.replace(REGEX_ESPACIODOBLE,''));
                        window.alert("Su cuenta aun no ha sido validada, favor de activar su correo");
                        window.location.href ="/validarCorreo";
                    }
                    else
                    {
                        sessionStorage.setItem('token',data.resultado);
                        window.alert("Bienvenido");
                        window.location.reload();
                    }
                }
                else
                {
                    window.alert("Error de acceso, verifique su correo y/o contraseña");
                }
            }).catch(error => {
                window.alert("Ocurrió un error");
                console.error(error);
            })
        }
    }

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
                        if(exito === true)
                        {
                            window.location.pathname = '../sesion/inicioPeriodista';
                        }
                        else
                        {
                            servicioValidarColeccionista()
                            .then(exito => {
                                if(exito === true)
                                {
                                    window.location.pathname = '../sesion/inicioColeccionista';
                                }
                            }).catch(err => {
                                window.alert("Ocurrió un error");
                                console.log(err);
                            }) 
                        }
                    }).catch(err => {
                        window.alert("Ocurrió un error");
                        console.log(err);
                    }) 
                }
                
                if(sessionStorage.getItem('correo') !== null)
                {
                    window.alert('Favor de validar su correo');
                    window.location.pathname = 'sesion/validarCorreo';
                }
            }
        }

        return (
            <div className="formGeneral" onLoad={checarSesion()}>
                <form onSubmit={(e)=>this.login(e)}>
                <h1>Iniciar Sesion</h1>

                <div className="form-group">
                    <label htmlFor="email" >Correo*  (minimo 5 y maximo 50 caracteres)</label>
                    <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" minLength={5} id="email"
                    maxLength="50" name="email" pattern= "[a-z0-9._%+-]+@+[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.handleChange} required/>
                </div>

                <div className="form-group" >
                    <label htmlFor="password">Contraseña* (minimo 6 y maximo 15 caracteres)</label>
                    <input name="password" type="password" maxLength="15" className="form-control"  minLength={5}
                    placeholder="introduce tu contraseña" onChange={this.handleChange} id="password" required />
                </div>
                <div className="form-end">
                    <button type="submit" className="botonNormal" disabled={this.state.disabled}>Acceder</button>
                    <p> ¿No estas registrado?<a href="registro">registrate</a> </p>
                    <p >Favor de verificar las especificaciones de cada campo</p>
                </div>
                </form>
            </div>
        );
    }
}