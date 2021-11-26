import { Guid } from "js-guid";
import Review from "../modelos/review.js";
import { guardarImagen } from "../utilidades/servicioImagen.js";

export async function guardarReview(nuevaCritica) {
    const CARPETA = "reviews";
    const { Foto } = nuevaCritica;
    const GUID = Guid.newGuid();
    var rutaImagen = "";
    const nombreArchivo = GUID + nuevaCritica.NombreFoto;
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
        IdCuenta: nuevaCritica.IdCuenta,
        IdFigura: nuevaCritica.IdFigura,
        Texto: nuevaCritica.Texto,
        Calificacion: nuevaCritica.Calificacion,
        Foto: rutaImagen,
        NombreFoto: nombreArchivo,
        TipoFoto: nuevaCritica.TipoFoto,
        DescripcionFoto: nuevaCritica.DescripcionFoto,
        Etiquetas: nuevaCritica.Etiquetas
    }

    const reviewAGuardar = new Review(review);

    return reviewAGuardar.save()
    .then((seGuardo) => {
        console.log("CRITICA GUARDADA: " + seGuardo);

        if(!seGuardo) {
            resultadoJSON.exito = false;
            resultadoJSON.mensaje = "Error: Ocurrió un error al intentar crear la crítica. Intenté de nuevo."
        } else {
            resultadoJSON.resultado = "Ruta de imagen es: " + seGuardo.Foto;
        }
        
        return resultadoJSON;
    })
    .catch(error => {
        console.error(error);
        resultadoJSON.exito = false;
        resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear la crítica. Intenté de nuevo.";
        return resultadoJSON;
    })
}

export async function eliminarReview(id) {
    return Review.deleteOne({IdPublicacion: id})
    .then(exito => {
        return exito.ok == 1;
    })
    .catch(error => {
        console.error(error);
    return false;
    })
}

export async function obtenerReviews(texto) {
    var filtro = {};
    if (texto) {
        filtro.$or = [
            { Titulo: { $regex: texto, $options: "i" } },
            { Etiquetas: { $regex: texto, $options: "i" } },
        ];

        return Review.find(filtro)
        .sort({ FechaRegistro: 'descending'})
        .then((criticias) => {
            return criticias;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
    } else {
        return await Review.find();
    }
}
  
export async function obtenerReviewDatos(identificador) {
    return await Review.findOne({ IdPublicacion: identificador });
}