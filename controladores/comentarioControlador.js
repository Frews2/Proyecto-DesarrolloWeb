import { Guid } from "js-guid";
import Comentario from "../modelos/comentario.js";
import { agregarComentarioANoticia, noEsNoticiaBaneada } from "../controladores/noticiaControlador.js";
import { agregarComentarioAReview, noEsReviewBaneado } from "../controladores/reviewControlador.js";
import { BANEADO, REPORTADO } from "../utilidades/constantes.js";

export async function guardarComentario(nuevoComentario) {
    const GUID = Guid.newGuid();
    var esNoticia = false;
    var esReview = false;
    var seAgrego = false;

    var resultadoJSON = {
        exito: true,
        origen: "comentario/guardar",
        mensaje: "EXITO: Comentario guardado",
        resultado: null
    };

    const comentario = {
        IdComentario: GUID,
        IdPublicacionOriginal: nuevoComentario.IdPublicacionOriginal,
        IdCuenta: nuevoComentario.IdCuenta,
        Texto: nuevoComentario.Texto
    }

    esNoticia = noEsNoticiaBaneada(comentario.IdPublicacionOriginal);
    
    if(esNoticia){
        seAgrego = agregarComentarioANoticia(comentario.IdPublicacionOriginal, comentario.IdComentario);
    } else {
        esReview = noEsReviewBaneado(comentario.IdPublicacionOriginal, comentario.IdComentario)
        
        if (esReview){
            seAgrego = agregarComentarioAReview(comentario.IdPublicacionOriginal, comentario.IdComentario);
        }
    }
    
    const comentarioAGuardar = new Comentario(comentario);

    if(seAgrego){
        return comentarioAGuardar.save()
            .then((seGuardo) => {
                console.log("COMENTARIO GUARDADO: " + seGuardo);

                if (!seGuardo) {
                    resultadoJSON.exito = false;
                    resultadoJSON.mensaje = "Error: Ocurrió un error al intentar guardar el comentario. Intenté de nuevo."
                } else {
                    resultadoJSON.resultado = "Texto de comentario es: " + seGuardo.Texto;
                }
            })
            .catch(error => {
                console.error(error);
                resultadoJSON.exito = false;
                resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear el comentario. Intenté de nuevo.";
            })

    } else{
        resultadoJSON.exito = false;
        resultadoJSON.mensaje = "ERROR: La id de publicación ingresada no es de un Review ni Noticia activa.";
    }

    return resultadoJSON;
}

export async function obtenerComentarios(idPublicacionOriginal) {

    return await Comentario.find({ IdPublicacionOriginal: idPublicacionOriginal, Estatus: { $ne: BANEADO } })
        .sort({ FechaRegistro: 'ascending' })
        .then((comentarios) => {
            return comentarios;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

export async function obtenerComentariosReportados() {
    var filtro = {};
    filtro.$or = [
        { Estatus: { $regex: REPORTADO } }
    ];

    return await Comentario.find(filtro)
        .sort({ FechaRegistro: 'ascending' })
        .then((comentarios) => {
            return comentarios;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}
  
export async function obtenerComentarioDatos(identificador) {
    return await Comentario.find({ IdComentario: identificador });
}

export async function reportarComentario(idComentario) {
    var seReporto = false
    
    if(Review.exists({IdComentario: idComentario})){
        return Review.updateOne(
            {IdComentario: idComentario},
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

export async function banearComentario(idComentario) {
    var seBaneo = false
    
    if(Comentario.exists({IdComentario: idComentario})){
        return Comentario.updateOne(
            {IdComentario: idComentario},
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

export async function esComentarioActivo(id) {
    return Comentario.exists({ IdComentario: id, Estatus: ACTIVO })
    .then((existe) => {
      return existe;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}