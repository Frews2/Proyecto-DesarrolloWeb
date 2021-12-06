import { Guid } from 'js-guid';
import Comentario from '../modelos/comentario.js';
import { agregarComentarioANoticia, esNoticiaActiva } from '../controladores/noticiaControlador.js';
import { agregarComentarioAReview, esReviewActivo } from '../controladores/reviewControlador.js';
import { ACTIVO, REPORTADO, ORDEN_ASCENDIENDO } from '../utilidades/constantes.js';

export async function guardarComentario(nuevoComentario) {
  const GUID = Guid.newGuid();
  var esNoticia = false;
  var esReview = false;
  var seAgrego = false;

  var resultadoJson = {
    exito: true,
    origen: 'comentario/guardar',
    mensaje: 'EXITO: Comentario guardado',
    resultado: null
  };

  var comentario = {
    IdComentario: GUID,
    IdPublicacionOriginal: nuevoComentario.IdPublicacionOriginal,
    IdCuenta: nuevoComentario.IdCuenta,
    Apodo: nuevoComentario.Apodo,
    Texto: nuevoComentario.Texto
  }

  esNoticia = await esNoticiaActiva(comentario.IdPublicacionOriginal);

  if (esNoticia) {
    seAgrego = await agregarComentarioANoticia(
      comentario.IdPublicacionOriginal,
      comentario.IdComentario);
  } else {
    esReview = await esReviewActivo(
      comentario.IdPublicacionOriginal,
      comentario.IdComentario);

    if (esReview) {
      seAgrego = await agregarComentarioAReview(
        comentario.IdPublicacionOriginal,
        comentario.IdComentario);
    }
  }

  var comentarioAGuardar = new Comentario(comentario);

  if (seAgrego) {
    return comentarioAGuardar.save()
    .then((seGuardo) => {
      if (!seGuardo) {
        resultadoJson.exito = false;
        resultadoJson.mensaje = 'Error: ' +
        'No pudimos guardar su comentario. Intenté de nuevo.';
      } else {
        resultadoJson.resultado = 'EXTIO: Comentario Guardado: ' +
        seGuardo.Texto;
      }
      return resultadoJson;
    })
    .catch(error => {
      console.error(error);
      resultadoJson.exito = false;
      resultadoJson.mensaje = 'ERROR: ' +
      'Ocurrió un error inesperado al intentar crear el comentario. ' +
      'Intenté de nuevo.';
      return resultadoJson;
    })
  } else {
    resultadoJson.exito = false;
    resultadoJson.mensaje = 'ERROR: ' +
    'La id de publicación ingresada no es de un Review ni Noticia activa.';
    return resultadoJson;
  }
}

export async function obtenerComentarios(idPublicacionOriginal) {
  return Comentario.find({
    IdPublicacionOriginal: idPublicacionOriginal,
    Estatus: ACTIVO
  })
    .sort({ FechaRegistro: ORDEN_ASCENDIENDO })
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
  var seReporto = false;

  if (Review.exists({ IdComentario: idComentario })) {
    return Review.updateOne(
      { IdComentario: idComentario },
      { Estatus: REPORTADO })
    .then(seActualizo => {
      if (seActualizo) {
        seReporto = true;
      }
      return seReporto;
    })
    .catch(error => {
      console.error(error);
      return seReporto;
    })
  }
  return seReporto;
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