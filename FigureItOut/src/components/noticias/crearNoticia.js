import React, { Component } from "react";

const API_LINK="http://localhost:4000/";


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
        console.log(entradaUsuario);
        if(entradaUsuario.replace(/\s/g,"").length > 0 && entradaUsuario.length > 5 
        && entradaUsuario.length < 50)
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
        if(this.validarInput(this.state.form.Titulo) === true && this.validarInput(this.state.form.Etiquetas) === true 
        && this.validarInput(this.state.form.FigurasCombox) === true && this.validarInput(this.state.form.DescripcionImagen) === true 
        && this.state.form.Imagen != null  && this.state.form.ExtensionImagen.length > 1 && this.state.form.Contenido.length > 100
        && this.state.form.Contenido.length < 1500 && this.state.form.Contenido.replace(/\s/g,"").length > 0)
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
        if(this.validarInput(this.state.form.Titulo) === true && this.validarInput(this.state.form.Etiquetas) === true 
        && this.validarInput(this.state.form.FigurasCombox) === true && this.validarInput(this.state.form.DescripcionImagen) === true 
        && this.state.form.Imagen != null  && this.state.form.ExtensionImagen.length > 1 && this.state.form.Contenido.length > 100
        && this.state.form.Contenido.length < 1500 && this.state.form.Contenido.replace(/\s/g,"").length > 0)
        {
            const noticiaForm = new FormData();
            noticiaForm.append("IdFigura", this.state.form.figurasCombox);
            noticiaForm.append('Titulo',this.state.form.Titulo.replace(/ +(?= )/g,''));
            noticiaForm.append('Texto',this.state.form.Contenido.replace(/ +(?= )/g,''));
            noticiaForm.append('Foto',this.state.archivoImagen, this.state.archivoImagen.name);
            noticiaForm.append('NombreFoto',this.state.form.Imagen);
            noticiaForm.append('TipoFoto',this.state.form.ExtensionImagen);
            noticiaForm.append('DescripcionFoto', this.state.form.DescripcionImagen.replace(/ +(?= )/g,''));
            noticiaForm.append('IdCuenta','39c2d6c5-cdaa-48e8-a231-8a60f59391c5');
            noticiaForm.append('Etiquetas',this.state.form.Etiquetas.replace(/ +(?= )/g,''));
            fetch(API_LINK+"noticias/Registrar", {
                method: "POST",
                body: noticiaForm 
            })
            .then(response=> response.json())
            .then(data=>{
                if(data.exito){
                    console.log(data);
                    alert("Se han guardado la noticia correctamente");
                }
                else{
                    console.log(data);
                    alert(data.mensaje);
                    data.resultado.forEach(error => {
                        alert(error.msg);
                    });
                }
            }).catch(error => {
                console.log(error)
            })
        }
        else
        {
            alert("Uno o mas campos se encuentran erroneos verifica");
        }
    }
    fileSelectHandler = event =>{
        if(event.target.files[0] !=null){
            if(event.target.files[0].name.length > 0 && event.target.files[0].name.length < 30){
                
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

                if(this.validarInput(this.state.form.Titulo) === true && this.validarInput(this.state.form.Etiquetas) === true 
                && this.validarInput(this.state.form.FigurasCombox) === true && this.validarInput(this.state.form.DescripcionImagen) === true 
                && this.state.form.Imagen != null  && this.state.form.ExtensionImagen.length > 1 && this.state.form.Contenido.length > 100
                && this.state.form.Contenido.length < 1500 && this.state.form.Contenido.replace(/\s/g,"").length > 0)
                {
                    this.setState({
                        disabled: false
                    });
                }

            }
            else
            {
                alert("El nombre del archivo es muy pesado, favor de acortar el nombre para poder subir la noticia");

                this.setState({
                    archivoImagen: null,
                    disabled: true
                })

                this.state.form.Imagen = null;
            }
        }
        else{
            this.setState({
                archivoImagen: null,
                disabled: true
            })
            this.state.form.Imagen = null;
        }
    }
    
    render() {
        
        window.onload = function()
        {
            let comboboxHTML = document.getElementById('figurasCombox');
            comboboxHTML.length = 0;

            fetch(API_LINK+"figuras/Buscar",{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response=> response.json())
            .then(data=>{
                if(data.exito){
                    console.log(data.resultado);
                        for (let i = 0; i < data.resultado.length; i++) {
                        var option = document.createElement('option');
                        option.appendChild(document.createTextNode(data.resultado[i].Nombre));
                        option.value = data.resultado[i].IdFigura;
                        comboboxHTML.appendChild(option);
                        } 
                }
                else{
                    console.log(data);
                    alert(data.mensaje);
                }
            }).catch(error => {
                console.log(error)
            });
        }
        return (
            <div className="formGeneral">
                <form onSubmit={(e)=>this.registrarNoticia(e)}>
                    <h2>Sube la noticia</h2>

                    <div className="form-group">
                        <label htmlFor="titulo" >Titulo*</label>
                        <input id="titulo" className="form-control" placeholder="Titulo de la noticia" minLength={5} 
                        maxLength="30" name="Titulo"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contenido">Contenido *</label>
                        <textarea type="text" id="contenido" className="textoLargo" maxLength="1500" className="form-control"  minLength={50} placeholder="Escribe tu Contenido" 
                        onChange={this.handleChange} name="Contenido" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="etiquetas" >Etiquetas * (Favor de separarlas con ,)</label>
                        <input id="etiquetas"  className="form-control" placeholder="Figura,Marca,Noticia" minLength={5} 
                        maxLength="50" name="Etiquetas"  onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="foto">Foto: </label>
                        <input id="foto" type="file" accept=".jpg" onChange={this.fileSelectHandler}/>  
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="descripcionImagen">Descripcion de la imagen *</label>
                        <input id="descripcionImagen" className="form-control" placeholder="Describe la imagen que adjuntaste" minLength={10} 
                        maxLength="50" name="DescripcionImagen"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="figurasCombox">Selecciona la figura *</label>
                        <select id="figurasCombox" name="FigurasCombox" onChange={this.handleChange} required></select>
                    </div>

                    <button type="submit" className="botonNormal" disabled={this.state.disabled} >Subir Noticia</button>
                    <p className="forgot-password text-right">Los campos con (*) son obligatorios de llenar </p>
                </form>
            </div>
        );
    }
}