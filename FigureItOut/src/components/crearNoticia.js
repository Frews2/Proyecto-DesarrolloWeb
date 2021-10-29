import React, { Component } from "react";

export class CrearNoticia extends Component {
    state={
        disabled:true,
        form:{
            Titulo:'',
            Contenido:''
        }
    }
    handleChange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        if(this.state.form.Titulo.length >=5){
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

    
    render() {
        
        return (
            <div className="login">
            <form onSubmit={(e)=>this.registrar(e)}>
                <h2>Sube la noticia</h2>

                <div className="form-group">
                    <label>Titulo*</label>
                    <input  className="form-control" placeholder="Titulo de la noticia" minLength={5} 
                    maxLength="50" name="Titulo"  onChange={this.handleChange} required/>
                </div>

                <div className="form-group">
                    <label>Contenido *</label>
                    <textarea type="text" maxLength="1000" className="form-control"  minLength={4} placeholder="Escribe tu Contenido" 
                    onChange={this.handleChange} name="Contenido" required/>
                </div>
                <div className="form-group">
                    <label>Foto</label>
                </div>
                <div className="form-group">
                    <label id="imagenMensaje" >Aun no ha seleccionado una Imagen</label>
                    <button type="file"  className="loginBtn" >Seleccionar Imagen Album</button>  
                </div>

                <button type="submit" className="loginBtn" disabled={this.state.disabled} >Subir Noticia</button>
                <p className="forgot-password text-right">Los campos con (*) son obligatorios de llenar </p>
            </form>
            </div>
        );
    }
}