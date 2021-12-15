/*
 Fecha: 22/11/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import { Guid } from 'js-guid';
import Comentario from '../modelos/comentario.js';
import { agregarComentarioANoticia, 
  esNoticiaActiva } from '../controladores/noticiaControlador.js';
import { agregarComentarioAReview, 
  esReviewActivo } from '../controladores/reviewControlador.js';
import { ACTIVO, REPORTADO, 
  ORDEN_ASCENDIENDO } from '../utilidades/constantes.js';

export async function guardarComentario(nuevoComentario) 
{
  const GUID = Guid.newGuid();
  var esNoticia = false;
  var esReview = false;
  var seAgrego = false;

  var resultadoJson = 
  {
    exito: false,
    origen: 'comentario/Registrar',
    mensaje: 'ERROR: No pudimos registrar su comentario. Intenté de nuevo.',
    resultado: null
  };

  var comentario = 
  {
    IdComentario: GUID,
    IdPublicacionOriginal: nuevoComentario.IdPublicacionOriginal,
    IdCuenta: nuevoComentario.IdCuenta,
    Apodo: nuevoComentario.Apodo,
    Texto: nuevoComentario.Texto
  };

  esNoticia = await esNoticiaActiva(comentario.IdPublicacionOriginal);

  if (esNoticia) 
  {
    seAgrego = await agregarComentarioANoticia(
      comentario.IdPublicacionOriginal,
      comentario.IdComentario);
  } else {
    esReview = await esReviewActivo(comentario.IdPublicacionOriginal);

    if (esReview) 
    {
      seAgrego = await agregarComentarioAReview(
        comentario.IdPublicacionOriginal,
        comentario.IdComentario);
    }
  }
  var comentarioAGuardar = new Comentario(comentario);

  if (seAgrego) 
  {
    return comentarioAGuardar.save()
    .then((seGuardo) => 
    {
      if (seGuardo) 
      {
        resultadoJson.exito = true;
        resultadoJson.mensaje = 'Éxito: Comentario guardado';
      }
      return resultadoJson;
    })
    .catch(error => 
    {
      console.error(error);
      resultadoJson.mensaje = 'ERROR: ' +
        'Ocurrió un error inesperado al intentar crear el comentario. ' +
        'Intenté de nuevo.';
      return resultadoJson;
    });
  } else 
  {
    resultadoJson.mensaje = 'ERROR: ' +
      'La id de publicación ingresada no es de un Review ni Noticia activa.';
    return resultadoJson;
  }
}

export async function obtenerComentarios(id) 
{
  return Comentario.find({ IdPublicacionOriginal: id, Estatus: ACTIVO })
    .sort({ FechaRegistro: ORDEN_ASCENDIENDO })
    .then((comentarios) => 
    {
      return comentarios;
  })
    .catch((err) => 
    {
      console.error(err);
      return [];
  });
}

export async function obtenerComentarioDatos(id) 
{
  return await Comentario.find({ IdComentario: id, Estatus: ACTIVO });
}

export async function reportarComentario(idComentario) 
{
  var seReporto = false;
  
  if(Comentario.exists({IdComentario: idComentario, Estatus: ACTIVO }))
  {
    return Comentario.updateOne(
      {IdComentario: idComentario},
      {Estatus: REPORTADO}
    )
    .then(seActualizo => 
    {
      if(seActualizo)
      {
        seReporto = true;
      } 
      return seReporto;
    })
    .catch(error => 
    {
      console.error(error);
      return seReporto;
    });
  }
  return seReporto;
}

export async function esComentarioActivo(id) 
{
  return Comentario.exists({ IdComentario: id, Estatus: ACTIVO })
  .then((existe) => 
  {
    return existe;
  })
  .catch((err) => 
  {
    console.error(err);
    return false;
  });
}