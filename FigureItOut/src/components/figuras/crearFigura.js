import React, { Component } from "react";

import { servicioRegistroFiguras } from "../../servicios/servicioFiguras.js";

const LONGITUD_MAXIMA_ARCHIVONOMBRE = 30;
const REGEX_ESPACIODOBLE=/ +(?= )/g;
const REGEX_ESPACIOBLANCO=/\s/g;
const LONGITUD_MINIMA_GENERAL= 0;
const LONGITUD_MAXIMA_GENERAL=21;

export class SubirFigura extends Component 
{
    
    state=
    {
        archivoImagen:null,
        disabled:true,
        form:{
            Nombre:'',
            Altura:'',
            Material:'',
            Marca:'',
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

    validarGeneral()
    {
        if(this.validarInput(this.state.form.Nombre) === true && this.state.form.Altura.length >= 1 
        && this.state.form.Altura.length < 4 && this.validarInput(this.state.form.Material) === true
        && this.validarInput(this.state.form.Marca) === true && this.state.form.Imagen != null  
        && this.validarInput(this.state.form.DescripcionImagen) === true 
        && this.state.form.ExtensionImagen.length > 1)
        {
            return true;
        }
        return false;
    }

    handleChange=async e=>
    {
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        if(this.validarGeneral() === true)
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

    async registrarFigura(e) 
    {
        e.preventDefault();
        if(typeof window !== "undefined")
        {
            if(this.validarGeneral() === true)
            {
                const figuraForm = new FormData();

                figuraForm.append('Nombre',this.state.form.Nombre.replace(REGEX_ESPACIODOBLE,''));
                figuraForm.append('Altura',this.state.form.Altura.replace(REGEX_ESPACIODOBLE,''));
                figuraForm.append('Material',this.state.form.Material.replace(REGEX_ESPACIODOBLE,''));
                figuraForm.append('Marca',this.state.form.Marca.replace(REGEX_ESPACIODOBLE,''));
                figuraForm.append('Foto',this.state.archivoImagen, this.state.archivoImagen.name);
                figuraForm.append('NombreFoto',this.state.form.Imagen);
                figuraForm.append('TipoFoto',this.state.form.ExtensionImagen);
                figuraForm.append('DescripcionFoto', this.state.form.DescripcionImagen.replace(REGEX_ESPACIODOBLE,''));

                servicioRegistroFiguras(figuraForm)
                .then(data=>
                    {
                        if(data.exito)
                        {
                            window.alert("Se ha guardado la figura correctamente");
                            window.location.href="/Figuras"
                        }
                        else
                        {
                            if(data.token===false)
                            {
                                window.alert(data.mensaje);
                            }
                            else
                            {
                                console.log(data);
                                window.alert(data.mensaje);
                                data.resultado.forEach(error => {
                                    window.alert(error.msg);
                                });
                            }
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
            if(event.target.files[0].name.length > 0 && event.target.files[0].name.length < LONGITUD_MAXIMA_ARCHIVONOMBRE)
            {
                
                let archivoTemporal = event.target.files[0];
                let blob = archivoTemporal.slice(0,archivoTemporal.size, archivoTemporal.type);
                
                let nuevoNombreArchivo = (event.target.files[0].name.split('.').slice(0, -1).join('.'))
                .replace(/ +/g, "");

                let extensionImagen ="."+(event.target.files[0].name.split('.').pop());
                let nuevaImagen= new File([blob],nuevoNombreArchivo + extensionImagen,
                {type: archivoTemporal.type});

                this.setState({
                    archivoImagen: nuevaImagen
                })
                
                this.state.form.Imagen = nuevoNombreArchivo;
                this.state.form.ExtensionImagen = extensionImagen;

                if(this.validarGeneral() === true)
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
                if(sessionStorage.getItem('token') === null)
                {
                    window.location.pathname = '/'
                    window.alert("Porfavor inicie sesion");
                }
            }
        }

        return (
            <div className="formGeneral" onLoad={checarSesion()}>
                <form onSubmit={(e)=>this.registrarFigura(e)}>
                    <h2>Sube la figura</h2>

                    <div className="form-group">
                        <label htmlFor="Nombre" >Nombre* (minimo 3 y maximo 20 caracteres)</label>
                        <input id="Nombre" className="form-control" placeholder="Nombre de la figura" minLength={3} 
                        maxLength="20" name="Nombre"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Altura" >Altura en centimetros* (Valor numerico entre 1 y 999)</label>
                        <input id="Altura" className="form-control" placeholder="Altura de la figura (en cm.)" minLength={1} 
                        maxLength="3" name="Altura"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Material" >Material* (minimo 3 y maximo 20 caracteres)</label>
                        <input id="Material"  className="form-control" placeholder="Material principal de la figura" minLength={3} 
                        maxLength="20" name="Material"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Marca" >Marca* (minimo 3 y maximo 20 caracteres)</label>
                        <input id="Marca"  className="form-control" placeholder="Marca del producto" minLength={3} 
                        maxLength="20" name="Marca"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="foto">Foto: </label>
                        <input id="foto" type="file" accept=".jpg" onChange={this.fileSelectHandler}/>  
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="descripcionImagen">Descripcion de la imagen* * (minimo 3 y maximo 20 caracteres)</label>
                        <input id="descripcionImagen" className="form-control" required
                        placeholder="Describe la imagen que adjuntaste"minLength={3} 
                        maxLength="20" name="DescripcionImagen"  onChange={this.handleChange}/>
                    </div>

                    <button type="submit" className="botonNormal" disabled={this.state.disabled} >Subir Figura</button>

                    <p >Los campos con (*) son obligatorios de llenar </p>
                    <p >Favor de verificar las especificaciones de cada campo</p>

                </form>
            </div>
        );
    }
}