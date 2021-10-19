import React from "react";

export class Login extends React.Component {

    render() {
        function login(e) {
            e.preventDefault();
            fetch("http://localhost:4000/cuentas/Login", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: datos.usuario,
                    Password: datos.contrasenia
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje)
            }).catch(error => {
                console.log(error)
            })
        }
        return (
            <div class="login">
            <form>
                <h2>Iniciar Sesion</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" required/>
                </div>

                <div className="form-group" >
                    <label>Contraseña</label>
                    <input type="password" className="form-control"  placeholder="introduce tu contraseña" required/>
                </div>
                <div clasName="form-end">
                    <button type="submit" className="loginBtn">Acceder</button>
                    <p>¿Olvidaste tu <a href="#">contraseña?</a></p>
                    <p> ¿No estas registrado?<a href="/register">registrate</a> </p>
                </div>
            </form>
            </div>
        );
    }
}