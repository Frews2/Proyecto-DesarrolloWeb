import React, { Component } from "react";

import { servicioRegistro } from "../../servicios/servicioSesion.js";

const ESTADO_REGISTRO="Pendiente";
const REGEX_MAIL=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_ESPACIOBLANCO=/\s/g;
const REGEX_ESPACIODOBLE=/ +(?= )/g;
const LONGITUD_MINIMA_GENERAL = 3;
const LONGITUD_MAXIMA_GENERAL = 16;
const LONGITUD_MINIMA_CORREO_CONTRASEÑA=5;
const LONGITUD_MAXIMA_CORREO= 50;

export class Registro extends Component 
{

    state=
    {
        disabled:true,
        form:
        {
            email:'',
            apodo:'',
            contraseña:'',
            nombre:'',
            ocupacion:'',
            fechaNacimiento:'',
            pais:'',
            confirmarContraseña:'',
            sexo:'',
            tipoCuenta:''
        }
    }

    validarInput(entradaUsuario)
    {
        if(entradaUsuario.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA_GENERAL 
        && entradaUsuario.length > LONGITUD_MINIMA_GENERAL
        && entradaUsuario.length < LONGITUD_MAXIMA_GENERAL)
        {
                return true;
        }
        return false;
    }
    

    validacionGeneral()
    {
        if(this.validarInput(this.state.form.ocupacion) === true && this.state.form.contraseña.length > LONGITUD_MINIMA_CORREO_CONTRASEÑA
        && this.state.form.email.length < LONGITUD_MAXIMA_CORREO && REGEX_MAIL.test(this.state.form.email) 
        && this.state.form.email.length > LONGITUD_MINIMA_CORREO_CONTRASEÑA && this.validarInput(this.state.form.apodo) === true 
        && this.validarInput(this.state.form.fechaNacimiento) === true && this.validarInput(this.state.form.sexo) === true 
        && this.state.form.contraseña === this.state.form.confirmarContraseña && this.validarInput(this.state.form.pais) === true 
        && this.validarInput(this.state.form.tipoCuenta) === true)
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

    async registrar(e) 
    {
        e.preventDefault();
        if(this.validacionGeneral() === true)
        {
            var actualDate = new Date();
            var registroFormatoFecha = new Date (this.state.form.fechaNacimiento);
            var formatoFecha = actualDate.getDate() + "/" + (actualDate.getMonth() + 1) + "/" + actualDate.getFullYear();
            var nacimientoFecha = (registroFormatoFecha.getDate()+1) + "/" + (registroFormatoFecha.getMonth() + 1) + "/" + registroFormatoFecha.getFullYear();
                    
            let datosRegistro =JSON.stringify({
                Email: this.state.form.email.replace(REGEX_ESPACIODOBLE,''),
                Password: this.state.form.contraseña,
                TipoCuenta: this.state.form.tipoCuenta.replace(REGEX_ESPACIODOBLE,''),
                Apodo: this.state.form.apodo.replace(REGEX_ESPACIODOBLE,''),
                Nombre: this.state.form.nombre.replace(REGEX_ESPACIODOBLE,''),
                Ocupacion: this.state.form.ocupacion.replace(REGEX_ESPACIODOBLE,''),
                FechaRegistro: formatoFecha,
                FechaNacimiento: nacimientoFecha,
                Pais: this.state.form.pais.replace(REGEX_ESPACIODOBLE,''),
                Sexo: this.state.form.sexo.replace(REGEX_ESPACIODOBLE,''),
                Estatus: ESTADO_REGISTRO
                })

            servicioRegistro(datosRegistro)
            .then(data=>
            {
                if(data.exito)
                {
                    alert("Se han guardado sus datos, verifique su correo");
                    sessionStorage.setItem('correo',this.state.form.email.replace(REGEX_ESPACIODOBLE,''));
                    window.location.pathname = 'sesion/validarCorreo';
                }
                else
                {
                    alert(data.mensaje);
                    if(data.resultado != null)
                    {
                        data.resultado.forEach(error => {
                            alert(error.msg);
                        });
                    }
                }
            }).catch(error => {
                alert("Ocurrió un error");
                console.error(error)
            })
        }
        else
        {
            alert("Uno o mas campos se encuentran erroneos verifica");
        }
    }

    render()
    {

        function checarSesion()
        {
            if(sessionStorage.getItem('correo') !== null )
            {
                window.location.pathname = 'sesion/validarCorreo';
            }
            if(sessionStorage.getItem('token') !== null)
            {
                window.location.pathname = '/'
            }
        }

        return (
            <div className="formGeneral" onLoad={checarSesion()}>
                <form onSubmit={(e)=>this.registrar(e)}>
                    <h1>Registrate</h1>

                    <div className="form-group">
                        <label htmlFor="apodo">Apodo *</label>
                        <input type="text" id="apodo" maxLength="15" className="form-control"  minLength={3} placeholder="Escribe tu apodo" 
                        onChange={this.handleChange} name="apodo" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor ="nombre" >Nombre *</label>
                        <input type="text" id="nombre" maxLength="15" className="form-control" name="nombre"
                        minLength={3} placeholder="Escribe tu primer nombre" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ocupacion" >Ocupacion *</label>
                        <input type="text" id="ocupacion"maxLength="15" className="form-control"  minLength={3} name="ocupacion"
                        placeholder="Escribe tu ocupacion" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fechaNacimiento">Fecha Nacimiento *</label>
                        <input type="date" id="fechaNacimiento" className="form-control" min="1950-01-01" max="2021-10-08" 
                        onChange={this.handleChange} name="fechaNacimiento" required/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="pais" >Pais *</label>
                            <select id="pais" name="pais" onChange={this.handleChange} required>
                                <option value="" disabled>Selecciona una opción</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Australia">Australia</option>
                                <option value="Belize">Belize</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Canada">Canada</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cuba">Cuba</option>
                                <option value="RepDominicana">Republica Dominicana</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Salvador">El Salvador</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Panama">Panama</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="PuertoRico">Puerto Rico</option>
                                <option value="España">España</option>
                                <option value="Uraguay">Uruguay</option>
                                <option value="Venezuela">Venezuela</option>
                            </select>
                        </div>

                    <div className="form-group">
                        <label htmlFor="Sexo" >Sexo *</label>
                        <select onChange={this.handleChange} id="Sexo" name="sexo" required>
                            <option disabled>Selecciona una opción</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipoCuenta">Tipo de cuenta *</label>
                        <select onChange={this.handleChange} id="tipoCuenta" name="tipoCuenta" required>
                            <option value="Periodista">Periodista</option>
                            <option value="Coleccionista">Coleccionista</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" >Correo *</label>
                        <input type="email" id="email" className="form-control" placeholder="tucorreo@ejemplo.com" minLength={5} 
                        maxLength="50" name="email" pattern= "[a-z0-9._%+-]+@+[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contraseña">Contraseña *</label>
                        <input name="contraseña" id="contraseña" type="password" maxLength="15" className="form-control"  minLength={6}
                        placeholder="introduce tu contraseña" onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarContraseña">Confirmar Contraseña *</label>
                        <input name="confirmarContraseña" id="confirmarContraseña" type="password" maxLength="15" className="form-control"  minLength={6}
                        placeholder="introduce tu contraseña" onChange={this.handleChange} required />
                    </div>
                    <button type="submit" className="botonNormal" disabled={this.state.disabled} >Registrate</button>
                    <p>¿Ya estas registrado?<a href="login">ingresa aqui</a> </p>
                    <p >Los campos con (*) son obligatorios de llenar </p>
                </form>
            </div>
        );
    }
}