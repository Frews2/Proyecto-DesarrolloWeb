import React, { Component } from "react";

export  class Register extends Component {
    render() {
        return (
            <div class="login">
            <form>
                <h2>Registrate</h2>

                <div className="form-group">
                    <label>Apodo</label>
                    <input type="text" className="form-control" placeholder="Escribe tu apodo" />
                </div>

                <div className="form-group">
                    <label>Fecha Nacimiento</label>
                    <input type="date" className="form-control" min="1950-01-01" max="2021-10-08" />
                </div>

                <div className="form-group">
                    <label>Sexo</label>
                    <select>
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="loginBtn">Registrate</button>
                <p className="forgot-password text-right">¿Ya estas registrado?<a href="/login">ingresa aqui</a> </p>
            </form>
            </div>
        );
    }
}