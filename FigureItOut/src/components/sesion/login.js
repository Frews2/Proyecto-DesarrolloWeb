import React, {Component} from "react";

const REGEX_MAIL=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LONGITUD_MINIMA=5;
const LONGITUD_MAXIMA_CONTRASENIA=20;
const LONGITUD_MAXIMA_CORREO=50;

export class Login extends Component {
    state={
        disabled:true,
        form:{
            email:'',
            password:''
        }
    }
    validacionGeneral(){
        if(this.state.form.email.length >=LONGITUD_MINIMA && this.state.form.password.length >LONGITUD_MINIMA 
            && this.state.form.email.length < LONGITUD_MAXIMA_CORREO && this.state.form.password.length< LONGITUD_MAXIMA_CONTRASENIA
            && REGEX_MAIL.test(this.state.form.email) && this.state.form.email.replace(/\s/g,"").length > LONGITUD_MINIMA 
            && this.state.form.password.replace(/\s/g,"").length >LONGITUD_MINIMA ){
            return true;
        }
        return false
    }

    handleChange=async e=>{
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

    async login(e) {
        e.preventDefault();
        //if(this.validacionGeneral() === true){
                fetch("http://localhost:4000/cuentas/Login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify({
                        Email: this.state.form.email.replace(/ +(?= )/g,''),
                        Password: this.state.form.password
                    })
                })
                .then(response=> response.json())
                .then(data=>{
                    if(data.exito){
                        console.log(data);
                        sessionStorage.setItem('token',data.resultado);
                        alert("Bienvenido");
                    }
                    else{
                        alert("Error de acceso, verifique su correo y/o contraseña");
                    }
                }).catch(error => {
                    console.log(error)
                })
        /*}
        else
        {
            alert("Uno o mas campos se encuentran incorrectos, verificar que cumpla el formato y no tenga espacios vacios");
        }*/
    }

    render() {
        return (
            <div className="formGeneral">
                <form onSubmit={(e)=>this.login(e)}>
                <h1>Iniciar Sesion</h1>

                <div className="form-group">
                    <label htmlFor="email" >Email:</label>
                    <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" minLength={5} id="email"
                    maxLength="50" name="email" pattern= "[a-z0-9._%+-]+@+[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.handleChange} required/>
                </div>

                <div className="form-group" >
                    <label htmlFor="password">Contraseña:</label>
                    <input name="password" type="password" maxLength="15" className="form-control"  minLength={6}
                    placeholder="introduce tu contraseña" onChange={this.handleChange} id="password" required />
                </div>
                <div className="form-end">
                    <button type="submit" className="botonNormal" disabled={this.state.disabled}>Acceder</button>
                    <p>¿Olvidaste tu <a href="#">contraseña?</a></p>
                    <p> ¿No estas registrado?<a href="/registro">registrate</a> </p>
                </div>
                </form>
            </div>
        );
    }
}