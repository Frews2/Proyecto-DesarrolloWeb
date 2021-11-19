import React, {Component} from "react";

export class Login extends Component {
    state={
        disabled:true,
        form:{
            email:'',
            password:''
        }
    }
    handleChange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        if(this.state.form.email.length >=5 && this.state.form.password.length >=4){
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

    async login(e) {
        e.preventDefault();
        fetch("http://localhost:4000/cuentas/Login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
                Email: this.state.form.email,
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
                alert("Error de inicio de sesion");
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={(e)=>this.login(e)}>
                <h1>Iniciar Sesion</h1>

                <div className="form-group">
                    <label for="email" >Email:</label>
                    <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" minLength={5} id="email"
                    maxLength="50" name="email" pattern= "[a-z0-9._%+-]+@+[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.handleChange} required/>
                </div>

                <div className="form-group" >
                    <label for="password">Contraseña:</label>
                    <input name="password" type="password" maxLength="15" className="form-control"  minLength={4}
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