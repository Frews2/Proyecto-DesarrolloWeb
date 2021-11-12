import { Guid } from "js-guid";
import { guardarPublicacion, eliminarPublicacion} from "./publicacionControlador.js";
import Review from "../modelos/review.js";
import { guardarImagen } from "../utilidades/servicioImagen.js";

export async function guardarReview(idCreador, nuevaCritica) {
    const CARPETA = "reviews";
    const { Foto } = nuevaCritica;
    const GUID = Guid.newGuid();
    var rutaImagen = "";
    const nombreArchivo = GUID + nuevaFigura.NombreFoto;
    Foto.name = nombreArchivo;

    var resultadoJSON = {
        exito: true,
        origen: "review/guardar",
        mensaje: "EXITO: Publicación guardada",
        resultado: null
    };

    const respuestaGuardado = await guardarImagen(Foto, CARPETA)
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

    const review = {
        IdPublicacion: GUID,
        Titulo: nuevaCritica.Titulo,
        IdFigura: nuevaCritica.IdFigura,
        Texto: nuevaCritica.Texto,
        Calificacion: nuevaCritica.Calificacion,
        Foto: rutaImagen,
        NombreFoto: nombreArchivo,
        TipoFoto: nuevaCritica.TipoFoto,
        DescripcionFoto: nuevaCritica.DescripcionFoto,
        Etiquetas: nuevaCritica.Etiquetas,
    }

    const reviewAGuardar = new Review(review);

    return reviewAGuardar.save()
    .then((seGuardo) => {
        console.log("CRITICA GUARDADA: " + seGuardo);

        if(!seGuardo) {
            resultadoJSON.exito = false;
            resultadoJSON.mensaje = "Error: Ocurrió un error al intentar crear la crítica. Intenté de nuevo."
        } else{
            return guardarPublicacion(idCreador, reviewAGuardar.IdPublicacion)
        }

        resultadoJSON.resultado = "Ruta de imagen es: " + seGuardo.Foto;
        return resultadoJSON;
    })
    .catch(error => {
        console.error(error);
        resultadoJSON.exito = false;
        resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear la crítica. Intenté de nuevo.";
        return resultadoJSON;
    })
}

export async function eliminarReview(idPublicacion) {
    return Review.deleteOne({IdPublicacion: idPublicacion})
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

export async function obtenerReviews(busqueda) {
    const { Nombre, Figura, Etiqueta } = busqueda;

    if (Nombre) {
          return await Review.find({ Titulo: Nombre });
    } else {
        if (Figura) {
            return await Review.find({IdFigura: Figura});
        } else {
            if (Etiqueta) {
                return await Review.find({Etiquetas: Etiqueta}); 
            } else{
                return await Review.find();
            }
        }
    }
}