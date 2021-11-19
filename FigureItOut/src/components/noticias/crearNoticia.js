import React, { Component } from "react";

export class CrearNoticia extends Component {
    
    state={
        archivoImagen:null,
        disabled:true,
        form:{
            Titulo:'',
            Contenido:'',
            Etiquetas:'',
            Imagen: null,
            DescripcionImagen:'',
            ExtensionImagen:''
        }
    }
    handleChange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
                
            },
        });
        console.log(this.state.form);
        if(this.state.form.Titulo.length >= 5 && this.state.form.Titulo.length <= 50 &&
            this.state.form.Contenido.length >= 50 && this.state.form.Contenido.length <= 1500 &&
            this.state.form.Etiquetas.length > 1 && this.state.form.Imagen != null  && this.state.form.DescripcionImagen.length > 10
            && this.state.form.ExtensionImagen.length > 1){
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

    async registrarNoticia(e) {
        e.preventDefault();
        const noticiaForm = new FormData();
        noticiaForm.append("IdFigura", "b763f4b3-f67a-498e-917d-f74b4affb19e");
        noticiaForm.append('Titulo',this.state.form.Titulo);
        noticiaForm.append('Texto',this.state.form.Contenido);
        noticiaForm.append('Foto',this.state.archivoImagen, this.state.archivoImagen.name);
        noticiaForm.append('NombreFoto',this.state.form.Imagen);
        noticiaForm.append('TipoFoto',this.state.form.ExtensionImagen);
        noticiaForm.append('DescripcionFoto', this.state.form.DescripcionImagen);
        noticiaForm.append('IdCuenta','39c2d6c5-cdaa-48e8-a231-8a60f59391c5');
        noticiaForm.append('Etiquetas',this.state.form.Etiquetas);
        console.log(noticiaForm);
        console.log(noticiaForm);
        fetch("http://localhost:4000/noticias/Registrar", {
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
            }
        }).catch(error => {
            console.log(error)
        })
    }
    fileSelectHandler = event =>{
        if(event.target.files[0] !=null){
            if(event.target.files[0].name.length > 0 && event.target.files[0].name.length < 30){
                
                let archivoTemporal = event.target.files[0];
                let blob = archivoTemporal.slice(0,archivoTemporal.size, archivoTemporal.type);
                let nuevoNombreArchivo = (event.target.files[0].name.split('.').slice(0, -1).join('.')).replace(/ +/g, "");
                let extensionImagen ="."+(event.target.files[0].name.split('.').pop());
                let nuevaImagen= new File([blob], nuevoNombreArchivo + extensionImagen,{type: archivoTemporal.type } );
                console.log(nuevaImagen);

                this.setState({
                    archivoImagen: nuevaImagen
                })

                if(this.state.form.Titulo.length >= 5 && this.state.form.Titulo.length <= 50 &&
                    this.state.form.Contenido.length >= 50 && this.state.form.Contenido.length <= 1500
                    && this.state.form.Etiquetas.length > 1){
                    this.setState({
                        disabled: false
                    });
                }

                this.state.form.Imagen = nuevoNombreArchivo;
                this.state.form.ExtensionImagen = extensionImagen;
            }else{
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
        return (
            <div className="login">
                <form onSubmit={(e)=>this.registrarNoticia(e)}>
                    <h2>Sube la noticia</h2>

                    <div className="form-group">
                        <label for="titulo" >Titulo*</label>
                        <input id="titulo" className="form-control" placeholder="Titulo de la noticia" minLength={5} 
                        maxLength="50" name="Titulo"  onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label for="contenido">Contenido *</label>
                        <textarea type="text" id="contenido" className="textoLargo" maxLength="1500" className="form-control"  minLength={50} placeholder="Escribe tu Contenido" 
                        onChange={this.handleChange} name="Contenido" required/>
                    </div>
                    <div className="form-group">
                        <label for="etiquetas" >Etiquetas * (Favor de separarlas con ,)</label>
                        <input id="etiquetas"  className="form-control" placeholder="Figura,Marca,Noticia" minLength={5} 
                        maxLength="50" name="Etiquetas"  onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label for="foto">Foto: </label>
                        <input id="foto" type="file" accept=".jpg" onChange={this.fileSelectHandler}/>  
                    </div>
                    
                    <div className="form-group">
                        <label for="descripcionImagen">Descripcion de la imagen *</label>
                        <input id="descripcionImagen" className="form-control" placeholder="Describe la imagen que adjuntaste" minLength={10} 
                        maxLength="100" name="DescripcionImagen"  onChange={this.handleChange} required/>
                    </div>

                    <button type="submit" className="botonNormal" disabled={this.state.disabled} >Subir Noticia</button>
                    <p className="forgot-password text-right">Los campos con (*) son obligatorios de llenar </p>
                </form>
            </div>
        );
    }
}