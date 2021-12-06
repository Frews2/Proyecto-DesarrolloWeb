import { Guid } from 'js-guid';
import Review from '../modelos/review.js';
import { guardarImagen } from '../utilidades/servicioImagen.js';
import { ACTIVO, REPORTADO, ORDEN_DESCENDIENDO } from '../utilidades/constantes.js';

export async function guardarReview(nuevaCritica) {
  const CARPETA = 'reviews';
  const { Foto } = nuevaCritica;
  const GUID = Guid.newGuid();
  var nombreArchivo = GUID + nuevaCritica.NombreFoto + nuevaCritica.TipoFoto;
  var archivoSinExtension = GUID + nuevaCritica.NombreFoto;
  var rutaImagen = '';

  var resultadoJson = {
    exito: true,
    origen: 'review/guardar',
    mensaje: 'EXITO: Publicación guardada',
    resultado: null
  };

  if(Foto.name != null){
    Foto.name = nombreArchivo;
  } else{
    resultadoJson.exito = false;
    resultadoJson.mensaje = 'ERROR: No se tiene una foto adjuntada.';
    return resultadoJson;
  }

  const respuestaGuardado = await guardarImagen(Foto, CARPETA)
  .then((resultado) => {
    return resultado;
  })
  .catch((err) => {
    console.error(err);
    return err;
  });

  if (!respuestaGuardado.exito) {
    resultadoJson.exito = false;
    resultadoJson.mensaje = respuestaGuardado.mensaje;
    return resultadoJson;
  }
  
  rutaImagen = respuestaGuardado.rutaImagen;

  var review = {
    IdPublicacion: GUID,
    Titulo: nuevaCritica.Titulo,
    IdCuenta: nuevaCritica.IdCuenta,
    IdFigura: nuevaCritica.IdFigura,
    Texto: nuevaCritica.Texto,
    Calificacion: nuevaCritica.Calificacion,
    Foto: rutaImagen,
    NombreFoto: archivoSinExtension,
    TipoFoto: nuevaCritica.TipoFoto,
    DescripcionFoto: nuevaCritica.DescripcionFoto,
    Etiquetas: nuevaCritica.Etiquetas
  }

  var reviewAGuardar = new Review(review);

  return reviewAGuardar.save()
  .then((seGuardo) => {
    console.log('CRITICA GUARDADA: ' + seGuardo);

    if(!seGuardo) {
      resultadoJson.exito = false;
      resultadoJson.mensaje = 'Error: Ocurrió un error al intentar crear la crítica. Intenté de nuevo.'
    } else {
      resultadoJson.resultado = 'Ruta de imagen es: ' + seGuardo.Foto;
    }
    
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.exito = false;
    resultadoJson.mensaje = 'ERROR: Ocurrió un error al intentar crear la crítica. Intenté de nuevo.';
    return resultadoJson;
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
    filtro.$and = [
      {$or: [
        { Titulo: { $regex: texto, $options: 'i' } },
        { Etiquetas: { $regex: texto, $options: 'i' } },
      ]},
      { Estatus: { $ne: BANEADO } }
    ]
    
    return Review.find(filtro)
    .sort({ FechaRegistro: ORDEN_DESCENDIENDO })
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