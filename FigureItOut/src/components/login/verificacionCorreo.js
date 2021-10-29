import React, {Component} from "react";

export class VerificacionCorreo extends Component {
    state={
        disabled:true,
        form:{
            codigoVer:''
        }
    }
    
    handleChange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        console.log(e.target.value);
        if(this.state.form.codigoVer.length == 5){
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
    
    async verificar(e) {
        e.preventDefault();
        console.log((sessionStorage.getItem('correo')).value);
        fetch("http://localhost:4000/codigos/Verificar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
                Correo: (sessionStorage.getItem('correo')),
                Numero: this.state.form.codigoVer
            })
        })
        .then(response=> response.json())
        .then(data=>{
            if(data.exito){
                sessionStorage.setItem('token',data.resultado);
                alert(data.mensaje);
                window.location.pathname = '/';
            }
            else{
                alert(data.mensaje);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    

    
    render() {
        const correo = sessionStorage.getItem('correo')

        window.onload = function()
        {
            if(correo == null)
            {
            window.location.pathname = '/'
            }
            else
            {
                console.log(correo);
            }
        }
        return (

            <form onSubmit={(e)=>this.verificar(e)}>
                <div className="login">
                    <h2>Valida Correo</h2>

                    <div className="form-group">
                        <label>Codigo de verificacion</label>
                        <input type="number" className="form-control" id="numeroEntrada" placeholder="Introduce el codigo"
                        name="codigoVer" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-end">
                        <button type="submit" className="loginBtn" disabled={this.state.disabled}>Acceder</button>
                        <p>Para terminar tu registro ingresa el codigo de 5 digitos que se te envio a tu correo</p>
                        <p> ¿No te llego ningun codigo?<a >Reenvia el correo</a> </p>
                    </div>
                </div>
            </form>
        );
    }
}