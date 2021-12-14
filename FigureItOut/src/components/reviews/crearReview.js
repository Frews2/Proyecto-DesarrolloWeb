import React, { Component } from "react";

import { servicioObtenerFiguras } from "../../servicios/servicioFiguras.js";
import { servicioRegistroReviews } from "../../servicios/servicioReviews.js";

const REGEX_NUMERO=/^[0-9]+$/;
const REGEX_ESPACIODOBLE=/ +(?= )/g;
const REGEX_ESPACIOBLANCO=/\s/g;
const EXTENSION_ARCHIVO = ".jpg";
const LONGITUD_MINIMA_ARCHIVONOMBRE = 5;
const LONGITUD_MAXIMA_GENERAL = 31;
const LONGITUD_MINIMA_GENERAL = 3;
const LOGITUD_MINIMA_VACIA = 0;

export class CrearReview extends Component {
    
    state={
        archivoImagen:null,
        disabled:true,
        form:{
            Titulo:'',
            Contenido:'',
            Etiquetas:'',
            FigurasCombox:'',
            Calificacion:'',
            Imagen: null,
            DescripcionImagen:'',
            ExtensionImagen:''
        }
    }

    validarInput(entradaUsuario){ 
        if(entradaUsuario.replace(REGEX_ESPACIOBLANCO,"").length > LONGITUD_MINIMA_GENERAL && 
        entradaUsuario.length > LONGITUD_MINIMA_GENERAL && 
        entradaUsuario.length < LONGITUD_MAXIMA_GENERAL)
        {
            return true;
        }
        return false;
    }

    validacionGeneral(){
        if(this.validarInput(this.state.form.Titulo) === true && this.state.form.Contenido.length >= 50 && 
        this.state.form.Contenido.length <= 1200 && this.validarInput(this.state.form.Etiquetas) === true &&
        this.state.form.Imagen != null && this.validarInput(this.state.form.DescripcionImagen) === true &&
        this.state.form.ExtensionImagen.length > LOGITUD_MINIMA_VACIA && 
        this.state.form.FigurasCombox.length > LOGITUD_MINIMA_VACIA &&
        this.state.form.Calificacion.length > LOGITUD_MINIMA_VACIA && this.state.form.Calificacion.length < 3 && 
        this.state.form.Calificacion.match(REGEX_NUMERO))
        {
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
        if(this.validacionGeneral() === true)
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

    async registrarNoticia(e) {
        e.preventDefault();
        if(typeof window !== "undefined")
        {
            if(this.validacionGeneral() === true && sessionStorage.getItem('token') !== null)
            {
                const reviewForm = new FormData();
                
                reviewForm.append("IdFigura", this.state.form.FigurasCombox);
                reviewForm.append('Titulo',this.state.form.Titulo.replace(REGEX_ESPACIODOBLE,''));
                reviewForm.append('Calificacion',this.state.form.Calificacion.replace(REGEX_ESPACIODOBLE,''));
                reviewForm.append('Texto',this.state.form.Contenido.replace(REGEX_ESPACIODOBLE,''));
                reviewForm.append('Foto',this.state.archivoImagen, this.state.archivoImagen.name);
                reviewForm.append('NombreFoto',this.state.form.Imagen);
                reviewForm.append('TipoFoto',this.state.form.ExtensionImagen);
                reviewForm.append('DescripcionFoto', this.state.form.DescripcionImagen.replace(REGEX_ESPACIODOBLE,''));
                reviewForm.append('IdCuenta','6f2850f9-b82f-451d-baf2-26fd93874418');
                reviewForm.append('Etiquetas',this.state.form.Etiquetas.replace(REGEX_ESPACIODOBLE,''));

                servicioRegistroReviews(reviewForm)
                .then(data=>
                {
                    if(data.exito)
                    {
                        window.alert("Se han guardado tu review correctamente");
                        window.location.pathname="/Reviews"
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
                window.alert("Uno o mas campos se encuentran incorrectos verificar");
            }
        }
    }

    handlreCambioArchivo = event =>
    {
        if(event.target.files[0] !=null && typeof window !== "undefined")
        {
            if(event.target.files[0].name.length > LONGITUD_MINIMA_ARCHIVONOMBRE && 
                event.target.files[0].name.length < LONGITUD_MAXIMA_GENERAL)
            {
                let extensionImagen ="."+(event.target.files[0].name.split('.').pop());
                if(extensionImagen === EXTENSION_ARCHIVO)
                {
                    let archivoTemporal = event.target.files[0];
                    let blob = archivoTemporal.slice(0,archivoTemporal.size, archivoTemporal.type);
                    let nuevoNombreArchivo = (event.target.files[0].name.split('.').slice(0, -1).join('.')).replace(/ +/g, "");
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
                    window.alert("El archivo seleccionado no es un .jpg, favor de verificar");
                    this.setState({
                        archivoImagen: null,
                        disabled: true
                    })
                    this.state.form.Imagen = null;
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
                            if(data.token === false)
                            {
                                window.alert(data.mensaje + "\nInicie sesion por favor");
                                window.location.pathname = '/'
                            }
                            else
                            {
                                window.alert(data.mensaje);
                            }
                        }
                    }).catch(error => {
                        console.log(error);
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
                    <h2>Sube tu review</h2>

                    <div className="form-group">
                        <label htmlFor="titulo" >Titulo*</label>
                        <input id="titulo" className="form-control" placeholder="Titulo de la noticia" minLength={3} 
                        maxLength="30" name="Titulo"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contenido">Contenido *</label>
                        <textarea type="text" id="contenido" className="textoLargo" maxLength="1190"   minLength={50} placeholder="Escribe tu Contenido" 
                        onChange={this.handleChange} name="Contenido" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="etiquetas" >Etiquetas * (Favor de separarlas con ,)</label>
                        <input id="etiquetas"  className="form-control" placeholder="Figura,Marca,Noticia" minLength={3} 
                        maxLength="30" name="Etiquetas"  onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="foto">Foto: </label>
                        <input id="foto" type="file" accept=".jpg" onChange={this.handlreCambioArchivo}/>  
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="descripcionImagen">Descripcion de la imagen *</label>
                        <input id="descripcionImagen" className="form-control" placeholder="Describe la imagen que adjuntaste" minLength={3} 
                        maxLength="30" name="DescripcionImagen"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="figura">Selecciona la figura *</label>
                        <select id="figurasCombox" name="FigurasCombox" onChange={this.handleChange} required>
                            <option value="" default>Selecciona una figura</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Calificacion">Dale una calificacion *</label>
                        <input type="number" className="form-control" id="calificacion" placeholder="En cantidad numerica del 1 a 10" 
                        name="Calificacion" onChange={this.handleChange} min={1} max={10} required/>
                    </div>

                    <button type="submit" className="botonNormal" disabled={this.state.disabled} >Subir Review</button>
                    <p className="forgot-password text-right">Los campos con (*) son obligatorios de llenar </p>
                </form>
            </div>
        );
    }
}