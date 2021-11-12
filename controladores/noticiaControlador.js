import { Guid } from "js-guid";
import { guardarPublicacion, eliminarPublicacion} from "./publicacionControlador.js";
import Noticia from "../modelos/noticia.js";
import { guardarImagenNoticia } from "../utilidades/servicioImagen.js";

export async function guardarNoticia(idCreador, nuevaNoticia) {
    const { Foto } = nuevaNoticia;
    const GUID = Guid.newGuid();
    var rutaImagen = "";

    var resultadoJSON = {
        exito: true,
        origen: "noticia/guardar",
        mensaje: "EXITO: Publicación guardada",
        resultado: null
    };

    const respuestaGuardado = await guardarImagenNoticia(Foto)
        .then((resultado) => {
            return resultado;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });

    if (!respuestaGuardado.exito) {
        resultadoJSON.exito = false;
        resultadoJSON.mensaje = respuestaGuardado.mensaje;
        return resultadoJSON;
    }
    rutaImagen = respuestaGuardado.rutaImagen;

    const noticia = {
        IdPublicacion: GUID,
        Titulo: nuevaNoticia.Titulo,
        IdFigura: nuevaNoticia.IdFigura,
        Texto: nuevaNoticia.Texto,
        Foto: rutaImagen,
        TipoFoto: nuevaNoticia.TipoFoto,
        DescripcionFoto: nuevaNoticia.DescripcionFoto,
        Etiquetas: nuevaNoticia.Etiquetas,
    }

    const noticiaAGuardar = new Noticia(noticia);

    return noticiaAGuardar.save()
    .then((seGuardo) => {
        console.log("NOTICIA GUARDADA: " + seGuardo);

        if(!seGuardo) {
            resultadoJSON.exito = false;
            resultadoJSON.mensaje = "Error: Ocurrió un error al intentar crear la noticia. Intenté de nuevo."
        } else{
            return guardarPublicacion(idCreador, noticiaAGuardar.IdPublicacion)
        }

        resultadoJSON.resultado = "Ruta de imagen es: " + seGuardo.Foto;
        return resultadoJSON;
    })
    .catch(error => {
        console.error(error);
        resultadoJSON.exito = false;
        resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear la noticia. Intenté de nuevo.";
        return resultadoJSON;
    })
}

export async function eliminarNoticia(idPublicacion) {
    return Noticia.deleteOne({IdPublicacion: idPublicacion})
        .then(exito => {
            if (!exito){
                return false;
            } else {
                return eliminarPublicacion(idPublicacion);
            }
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