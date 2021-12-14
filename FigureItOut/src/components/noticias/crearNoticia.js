import React, { Component } from "react";

import { servicioRegistroNoticias } from "../../servicios/servicioNoticias.js";
import { servicioObtenerFiguras } from "../../servicios/servicioFiguras.js";


const LONGITUD_MAXIMA_GENERAL = 50;
const LONGITUD_MINIMA_GENERAL = 5;
const REGEX_ESPACIODOBLE=/ +(?= )/g;
const REGEX_ESPACIOBLANCO=/\s/g;

export class CrearNoticia extends Component {
    state={
        archivoImagen:null,
        disabled:true,
        form:{
            Titulo:'',
            Contenido:'',
            Etiquetas:'',
            FigurasCombox:'',
            Imagen: null,
            DescripcionImagen:'',
            ExtensionImagen:''
        }
    }

    validarInput(entradaUsuario)
    { 
        if(entradaUsuario.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA_GENERAL && 
        entradaUsuario.length > LONGITUD_MINIMA_GENERAL && entradaUsuario.length < LONGITUD_MAXIMA_GENERAL)
        {
            return true;
        }
        return false;
    }

    validacionGeneral()
    {
        if(this.validarInput(this.state.form.Titulo) === true && this.validarInput(this.state.form.Etiquetas) === true 
        && this.validarInput(this.state.form.FigurasCombox) === true && this.validarInput(this.state.form.DescripcionImagen) === true 
        && this.state.form.Imagen != null  && this.state.form.ExtensionImagen.length > 1 && this.state.form.Contenido.length > 100
        && this.state.form.Contenido.length < 1500 && this.state.form.Contenido.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA_GENERAL)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    handleChange=async e=>{
        
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        if(this.validacionGeneral()=== true)
        {
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
    
    async registrarNoticia(e)
    {
        e.preventDefault();
        if(typeof window !== "undefined")
        {
            if(this.validacionGeneral() === true &&  sessionStorage.getItem('token') !== null)
            {
                const noticiaForm = new FormData();
                noticiaForm.append("IdFigura", this.state.form.FigurasCombox);
                noticiaForm.append('Titulo',this.state.form.Titulo.replace(REGEX_ESPACIODOBLE,''));
                noticiaForm.append('Texto',this.state.form.Contenido.replace(REGEX_ESPACIODOBLE,''));
                noticiaForm.append('Foto',this.state.archivoImagen, this.state.archivoImagen.name);
                noticiaForm.append('NombreFoto',this.state.form.Imagen);
                noticiaForm.append('TipoFoto',this.state.form.ExtensionImagen);
                noticiaForm.append('DescripcionFoto', this.state.form.DescripcionImagen.replace(REGEX_ESPACIODOBLE,''));
                noticiaForm.append('IdCuenta','39c2d6c5-cdaa-48e8-a231-8a60f59391c5');
                noticiaForm.append('Etiquetas',this.state.form.Etiquetas.replace(REGEX_ESPACIODOBLE,''));
                

                servicioRegistroNoticias(noticiaForm)
                .then(data=>{
                    if(data.exito)
                    {
                        window.alert("Se han guardado la noticia correctamente");
                        window.location.href="/Noticias"
                    }
                    else
                    {
                        window.alert(data.mensaje);
                        data.resultado.forEach(error => {
                            window.alert(error.msg);
                        });
                    }
                }).catch(error => {
                    window.alert("Ocurrió un error");
                    console.error(error);
                })
            }
            else
            {
                window.alert("Uno o mas campos se encuentran erroneos verifica");
            }
        }
    }

    fileSelectHandler = event =>
    {
        if(event.target.files[0] !=null && typeof window !== "undefined")
        {
            if(event.target.files[0].name.length > 0 && event.target.files[0].name.length < 30)
            {
                
                let archivoTemporal = event.target.files[0];
                let blob = archivoTemporal.slice(0,archivoTemporal.size, archivoTemporal.type);
                let nuevoNombreArchivo = (event.target.files[0].name.split('.').slice(0, -1).join('.')).replace(/ +/g, "");
                let extensionImagen ="."+(event.target.files[0].name.split('.').pop());
                let nuevaImagen= new File([blob], nuevoNombreArchivo + extensionImagen,{type: archivoTemporal.type } );

                this.setState({
                    archivoImagen: nuevaImagen
                })

                this.state.form.Imagen = nuevoNombreArchivo;
                this.state.form.ExtensionImagen = extensionImagen;

                if(this.validacionGeneral() === true)
                {
                    this.setState({
                        disabled: false
                    });
                }

            }
            else
            {
                window.alert("El nombre del archivo es muy pesado, favor de acortar el nombre para poder subir la noticia");

                this.setState({
                    archivoImagen: null,
                    disabled: true
                })

                this.state.form.Imagen = null;
            }
        }
        else
        {
            this.setState({
                archivoImagen: null,
                disabled: true
            })
            this.state.form.Imagen = null;
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
                    let comboboxHTML = document.getElementById('figurasCombox');
                    comboboxHTML.length = 0;

                    servicioObtenerFiguras()
                    .then(data=>{
                        if(data.exito)
                        {
                            for (let i = 0; i < data.resultado.length; i++) 
                            {
                                var option = document.createElement('option');
                                option.appendChild(document.createTextNode(data.resultado[i].Nombre));
                                option.value = data.resultado[i].IdFigura;
                                comboboxHTML.appendChild(option);
                            } 
                        }
                        else
                        {
                            window.alert(data.mensaje);
                        }
                    }).catch(error => {
                        console.log(error)
                    });
                }
                else
                {
                    window.location.pathname = '/'
                    window.alert("Porfavor inicie sesion");
                }
            }
        }

        return (
            <div className="formGeneral" onLoad={checarSesion()}>
                <form onSubmit={(e)=>this.registrarNoticia(e)}>
                    <h2>Sube la noticia</h2>

                    <div className="form-group">
                        <label htmlFor="titulo" >Titulo* (minimo 3 y maximo 30 caracteres)</label>
                        <input id="titulo" className="form-control" placeholder="Titulo de la noticia" minLength={5} 
                        maxLength="30" name="Titulo"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contenido">Contenido* (minimo 50 y maximo 1500 caracteres)</label>
                        <textarea type="text" id="contenido" className="textoLargo" maxLength="1500"  minLength={50} placeholder="Escribe tu Contenido" 
                        onChange={this.handleChange} name="Contenido" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="etiquetas" >Etiquetas* Separadas con , (minimo 3 y maximo 30 caracteres)</label>
                        <input id="etiquetas"  className="form-control" placeholder="Figura,Marca,Noticia" minLength={5} 
                        maxLength="49" name="Etiquetas"  onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="foto">Foto: </label>
                        <input id="foto" type="file" accept=".jpg" onChange={this.fileSelectHandler}/>  
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="descripcionImagen">Descripcion de la imagen* (minimo 3 y maximo 30 caracteres)</label>
                        <input id="descripcionImagen" className="form-control" placeholder="Describe la imagen que adjuntaste" minLength={10} 
                        maxLength="49" name="DescripcionImagen"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="figurasCombox">Selecciona la figura *</label>
                        <select id="figurasCombox" name="FigurasCombox" onChange={this.handleChange} required>
                            <option value="" default>Selecciona una opción</option>
                        </select>
                    </div>

                    <button type="submit" className="botonNormal" disabled={this.state.disabled} >Subir Noticia</button>
                    <p>Los campos con (*) son obligatorios de llenar </p>
                    <p >Favor de verificar las especificaciones de cada campo</p>
                </form>
            </div>
        );
    }
}