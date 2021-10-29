import React, { Component } from "react";

export class Registro extends Component {
    state={
        disabled:true,
        form:{
            email:'',
            apodo:'',
            password:'',
            nombre:'',
            ocupacion:'',
            fechaNacimiento:'',
            pais:'',
            confirmarPassword:'',
            sexo:'',
            tipoCuenta:'',
            nombre:''
        }
    }
    handleChange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        if(this.state.form.email.length >=5 && this.state.form.password.length >=4 &&
            this.state.form.apodo.length >=5 && this.state.form.fechaNacimiento.length > 0
            && this.state.form.sexo.length > 0 && this.state.form.password === this.state.form.confirmarPassword
            && this.state.form.pais.length > 0 && this.state.form.tipoCuenta.length){
            this.setState({
                disabled: false
            });
        }else
        {
            this.setState({
                disabled: true
            });
        }
    }

    async registrar(e) {
        e.preventDefault();

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
                Email: this.state.form.email,
                Password: this.state.form.password,
                TipoCuenta: this.state.form.tipoCuenta,
                Apodo: this.state.form.apodo,
                Nombre: this.state.form.nombre,
                Ocupacion: this.state.form.ocupacion,
                FechaRegistro: formatDate,
                FechaNacimiento: nacimientoFecha,
                Pais: this.state.form.pais,
                Sexo: this.state.form.sexo,
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
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="login">
            <form onSubmit={(e)=>this.registrar(e)}>
                <h2>Registrate</h2>

                <div className="form-group">
                    <label>Apodo *</label>
                    <input type="text" maxLength="15" className="form-control"  minLength={4} placeholder="Escribe tu apodo" 
                    onChange={this.handleChange} name="apodo" required/>
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" maxLength="15" className="form-control" name="nombre"
                     minLength={1} placeholder="Escribe tu primer nombre(opcional)" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Ocupacion</label>
                    <input type="text" maxLength="15" className="form-control"  minLength={4}  name="ocupacion"
                    placeholder="Escribe tu ocupacion(opcional)" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Fecha Nacimiento *</label>
                    <input type="date" className="form-control" min="1950-01-01" max="2021-10-08" 
                    onChange={this.handleChange} name="fechaNacimiento" required/>
                </div>
                
                <div className="form-group">
                    <label >Pais *</label>
                        <select id="country" name="pais" onChange={this.handleChange} required>
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
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="Great Britain">Great Britain</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Honduras">Honduras</option>
                            <option value="India">India</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Mexico">Mexico</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Panama">Panama</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Spain">Spain</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States of America">United States of America</option>
                            <option value="Uraguay">Uruguay</option>
                            <option value="Venezuela">Venezuela</option>
                        </select>
                    </div>

                <div className="form-group">
                    <label >Sexo *</label>
                    <select onChange={this.handleChange} name="sexo" required>
                        <option disabled selected>Selecciona una opción</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div className="form-group">
                    <label name="tipoCuenta">Tipo de cuenta *</label>
                    <select onChange={this.handleChange} name="tipoCuenta" required>
                        <option disabled selected>Selecciona una opción</option>
                        <option value="Periodista">Periodista</option>
                        <option value="Coleccionista">Coleccionista</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Correo *</label>
                    <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" minLength={5} 
                    maxLength="50" name="email" pattern= "[a-z0-9._%+-]+@+[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.handleChange} required/>
                </div>

                <div className="form-group">
                    <label>Contraseña *</label>
                    <input name="password" type="password" maxLength="15" className="form-control"  minLength={4}
                    placeholder="introduce tu contraseña" onChange={this.handleChange} required />
                </div>

                <div className="form-group">
                    <label>Confirmar Contraseña *</label>
                    <input name="confirmarPassword" type="password" maxLength="15" className="form-control"  minLength={4}
                    placeholder="introduce tu contraseña" onChange={this.handleChange} required />
                </div>
                <button type="submit" className="loginBtn" disabled={this.state.disabled} >Registrate</button>
                <p className="forgot-password text-right">¿Ya estas registrado?<a href="/login">ingresa aqui</a> </p>
                <p className="forgot-password text-right">Los campos con (*) son obligatorios de llenar </p>
            </form>
            </div>
        );
    }
}