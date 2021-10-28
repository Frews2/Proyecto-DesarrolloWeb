import { Guid } from "js-guid";
import Noticia from '../models/noticia.js';
import { guardarImagen } from "../utilidades/servicioImagen.js";

export async function guardarNoticia(idContenido, nuevaNoticia) {
    const { imagen } = nuevaNoticia;

    var rutaImagen = "";

    var resultadoJSON = {
        exito: true,
        origen: "publicacion/guardar",
        mensaje: "EXITO: Publicación guardada",
    };

    if (imagen) {
        const respuestaGuardado = await guardarImagen(imagen)
            .then((resultado) => {
                rutaImagen = respuestaGuardado.path;
                return resultado;
            })
            .catch((err) => {
                console.error(err);
                return err;
            });

        if(!respuestaGuardado.exito) {
            resultadoJSON.exito = respuestaGuardado.exito;
            resultadoJSON.mensaje = respuestaGuardado.mensaje;
            return resultadoJSON;
        } 
    }

    const noticia = {
        IdPublicacion: idContenido,
        IdFigura: nuevaNoticia.IdFigura,
        Texto: nuevaNoticia.Texto,
        Foto: rutaImagen,
        Etiquetas: nuevaNoticia.Etiquetas,
    }

    const noticiaAGuardar = new Noticia(noticia);

    return noticiaAGuardar.save()
    .then((seGuardo) => {
        console.log(seGuardo);

        if(!seGuardo) {
            resultadoJSON.exito = false;
            resultadoJSON.mensaje = "Error: Ocurrió un error al intentar crear la noticia. Intenté de nuevo."
        }

        return resultadoJSON;
    })
    .catch(error => {
        console.error(error);
        resultadoJSON.exito = false;
        resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear la noticia. Intenté de nuevo.";
        return resultadoCreacion;
    })
}

export async function eliminarNoticia(idPublicacion) {
    return Noticia.deleteOne({IdPublicacion: idPublicacion})
        .then(exito => {
            return exito.ok == 1;
        })
        .catch(error => {
            console.error(error);
        return false;
        })
}

export async function obtenerNoticias(busqueda) {
    const { IdContendio, Figura, Etiqueta } = busqueda;

    if (IdContendio) {
          return await Noticia.find({ IdPublicacion: IdContendio });
    } else {
        if (Figura) {
            return await Noticia.find({IdFigura: Figura});
        } else {
            if (Etiqueta) {
                return await Noticia.find({Etiquetas: Etiqueta}); 
            } else{
                return await Noticia.find();
            }
        }
    }
}