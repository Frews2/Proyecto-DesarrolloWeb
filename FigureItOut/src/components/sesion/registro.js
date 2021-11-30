import React, { Component } from "react";

export class Registro extends Component {
    state={
        disabled:true,
        form:{
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

    validarInput(entradaUsuario){ 
        if(entradaUsuario.replace(/\s/g,"").length > 0 && entradaUsuario.length > 0
        && entradaUsuario.length < 16){
                return true;
        }
        return false;
    }


    handleChange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        if(this.validarInput(this.state.form.email) === true && this.validarInput(this.state.form.password) === true 
            && this.state.form.email.length < 50 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.form.email)
            && this.validarInput(this.state.form.apodo) === true && this.validarInput(this.state.form.fechaNacimiento) === true
            && this.validarInput(this.state.form.sexo) === true && this.state.form.contraseña === this.state.form.confirmarContraseña
            && this.validarInput(this.state.form.pais) === true && this.validarInput(this.state.form.tipoCuenta) === true
            & this.validarInput(this.state.form.ocupacion) === true){
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

    async registrar(e) {
        e.preventDefault();
        if(this.validarInput(this.state.form.email) === true && this.validarInput(this.state.form.password) === true 
            && this.state.form.email.length < 50 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.form.email)
            && this.validarInput(this.state.form.apodo) === true && this.validarInput(this.state.form.fechaNacimiento) === true
            && this.validarInput(this.state.form.sexo) === true && this.state.form.contraseña === this.state.form.confirmarContraseña
            && this.validarInput(this.state.form.pais) === true && this.validarInput(this.state.form.tipoCuenta) === true
            & this.validarInput(this.state.form.ocupacion) === true){

                var actualDate = new Date();
                const formatDate = actualDate.getDate() + "/" + (actualDate.getMonth() + 1) + "/" + actualDate.getFullYear();
                var registroFormatoFecha = new Date (this.state.form.fechaNacimiento);
                const nacimientoFecha = (registroFormatoFecha.getDate()+1) + "/" + (registroFormatoFecha.getMonth() + 1) + "/" + registroFormatoFecha.getFullYear();
                
                fetch("http://localhost:4000/cuentas/Registrar", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify({
                        Email: this.state.form.email.replace(/ +(?= )/g,''),
                        Password: this.state.form.contraseña.replace(/ +(?= )/g,''),
                        TipoCuenta: this.state.form.tipoCuenta.replace(/ +(?= )/g,''),
                        Apodo: this.state.form.apodo.replace(/ +(?= )/g,''),
                        Nombre: this.state.form.nombre.replace(/ +(?= )/g,''),
                        Ocupacion: this.state.form.ocupacion.replace(/ +(?= )/g,''),
                        FechaRegistro: formatDate,
                        FechaNacimiento: nacimientoFecha,
                        Pais: this.state.form.pais.replace(/ +(?= )/g,''),
                        Sexo: this.state.form.sexo.replace(/ +(?= )/g,''),
                        Estatus: "Pendiente"
                    })
                })
                .then(response=> response.json())
                .then(data=>{
                    if(data.exito){
                        console.log(data);
                        alert("Se han guardado sus datos, verifique su correo");
                        sessionStorage.setItem('correo',this.state.form.email);
                        window.location.pathname = '/validarCorreo';
                    }
                    else{
                        console.log(data);
                        alert(data.mensaje);
                        data.resultado.forEach(error => {
                            alert(error.msg);
                        });
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
            else
            {
                alert("Uno o mas campos se encuentran erroneos verifica");
            }
    }

    render() {
        return (
            <div className="formGeneral">
            <form onSubmit={(e)=>this.registrar(e)}>
                <h1>Registrate</h1>

                <div className="form-group">
                    <label htmlFor="apodo">Apodo *</label>
                    <input type="text" id="apodo" maxLength="15" className="form-control"  minLength={4} placeholder="Escribe tu apodo" 
                    onChange={this.handleChange} name="apodo" required/>
                </div>
                <div className="form-group">
                    <label htmlFor ="nombre" >Nombre</label>
                    <input type="text" id="nombre" maxLength="15" className="form-control" name="nombre"
                     minLength={1} placeholder="Escribe tu primer nombre(opcional)" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="ocupacion" >Ocupacion</label>
                    <input type="text" id="ocupacion"maxLength="15" className="form-control"  minLength={4}  name="ocupacion"
                    placeholder="Escribe tu ocupacion(opcional)" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="fechaNacimiento">Fecha Nacimiento *</label>
                    <input type="date" id="fechaNacimiento" className="form-control" min="1950-01-01" max="2021-10-08" 
                    onChange={this.handleChange} name="fechaNacimiento" required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="pais" >Pais *</label>
                        <select id="pais" name="pais" onChange={this.handleChange} required>
                            <option disabled selected>Selecciona una opción</option>
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
                        <option disabled selected>Selecciona una opción</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tipoCuenta">Tipo de cuenta *</label>
                    <select onChange={this.handleChange} id="tipoCuenta" name="tipoCuenta" required>
                        <option disabled selected>Selecciona una opción</option>
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
                    <input name="contraseña" id="contraseña" type="password" maxLength="15" className="form-control"  minLength={4}
                    placeholder="introduce tu contraseña" onChange={this.handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmarContraseña">Confirmar Contraseña *</label>
                    <input name="confirmarContraseña" id="confirmarContraseña" type="password" maxLength="15" className="form-control"  minLength={4}
                    placeholder="introduce tu contraseña" onChange={this.handleChange} required />
                </div>
                <button type="submit" className="botonNormal" disabled={this.state.disabled} >Registrate</button>
                <p>¿Ya estas registrado?<a href="/login">ingresa aqui</a> </p>
                <p >Los campos con (*) son obligatorios de llenar </p>
            </form>
            </div>
        );
    }
}