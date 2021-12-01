import { Guid } from "js-guid";
import Review from "../modelos/review.js";
import { guardarImagen } from "../utilidades/servicioImagen.js";
import { BANEADO, REPORTADO } from "../utilidades/constantes.js";

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

export async function obtenerReviewsReportados() {
    var filtro = {};
    filtro.$or = [
        { Estatus: { $regex: REPORTADO } }
    ];

    return await Review.find(filtro)
        .sort({ FechaRegistro: 'ascending' })
        .then((criticias) => {
            return criticias;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

export async function obtenerReviews(texto) {
    var filtro = {};
    if (texto) {
        filtro.$and = [
            {$or: [
                { Titulo: { $regex: texto, $options: "i" } },
                { Etiquetas: { $regex: texto, $options: "i" } },
            ]},
            { Estatus: { $ne: BANEADO } }
        ]
        
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
    return await Review.find({ IdPublicacion: identificador });
}

export async function noEsReviewBaneado(idPublicacion) {
    return Review.exists({ IdPublicacion: idPublicacion, Estatus: { $ne: BANEADO } })
    .then((existe) => {
      return existe;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function esReviewActivo(idPublicacion) {
    return Review.exists({ IdPublicacion: idPublicacion, Estatus: ACTIVO })
    .then((existe) => {
      return existe;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function agregarComentarioAReview(idPublicacion, idComentario) {
    var seAgregoComentario = false
    
    if(Review.exists({IdPublicacion: idPublicacion})){
        return Noticia.updateOne(
            {IdPublicacion: idPublicacion},
            { $push: {comentarios: idComentario} } 
        )
        .then(seGuardo => {
            console.log(seGuardo)
            if(seGuardo){
                seAgregoComentario = true;
            } 
        })
        .catch(error => {
            console.error(error);
        })
    }

    return seAgregoComentario;
}

export async function reportarReview(idPublicacion) {
    var seReporto = false
    
    if(Review.exists({IdPublicacion: idPublicacion})){
        return Review.updateOne(
            {IdPublicacion: idPublicacion},
            {Estatus: REPORTADO}
        )
        .then(seActualizo => {
            if(seActualizo){
                seReporto = true;
            } 
        })
        .catch(error => {
            console.error(error);
        })
    }

    return seReporto;
}

export async function banearReview(idPublicacion) {
    var seBaneo = false
    
    if(Review.exists({IdPublicacion: idPublicacion})){
        return Review.updateOne(
            {IdPublicacion: idPublicacion},
            {Estatus: BANEADO}
        )
        .then(seActualizo => {
            if(seActualizo){
                seBaneo = true;
            } 
        })
        .catch(error => {
            console.error(error);
        })
    }

    return seBaneo;
}