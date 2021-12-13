import { Guid } from 'js-guid';
import Review from '../modelos/review.js';
import { guardarImagen } from '../utilidades/servicioImagen.js';
import { ACTIVO, REPORTADO,
  ORDEN_DESCENDIENDO, INCLUIR } from '../utilidades/constantes.js';

export async function guardarReview(nuevaCritica) {
  const CARPETA = 'reviews';
  const { Foto } = nuevaCritica;
  const GUID = Guid.newGuid();
  var nombreArchivo = GUID + nuevaCritica.NombreFoto + nuevaCritica.TipoFoto;
  var archivoSinExtension = GUID + nuevaCritica.NombreFoto;
  var rutaImagen = '';

  var resultadoJson = {
    exito: false,
    origen: 'review/Registrar',
    mensaje: 'ERROR: No pudimos registrar el review. Intenté de nuevo.',
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
  };

  var reviewAGuardar = new Review(review);

  return reviewAGuardar.save()
  .then((seGuardo) => {
    if(seGuardo) {
      resultadoJson.exito = true;
      resultadoJson.mensaje = 'ÉXITO: Review guardado.';
      resultadoJson.resultado = 'Ruta de imagen es: ' + seGuardo.Foto;
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.mensaje = 'ERROR: ' +
      'Ocurrió un error al intentar crear la crítica. Intenté de nuevo.';
    return resultadoJson;
  });
}

export async function agregarComentarioAReview(idPublicacion, idComentario) {
  var seAgregoComentario = false;
  
  if(Review.exists({IdPublicacion: idPublicacion, Estatus: ACTIVO})){
    return Review.updateOne(
      {IdPublicacion: idPublicacion},
      { $push: {comentarios: idComentario} } 
    )
    .then(seGuardo => {
      if(seGuardo){
        seAgregoComentario = true;
      } 
      return seAgregoComentario;
    })
    .catch(error => {
      console.error(error);
      return seAgregoComentario;
    });
  }
  return seAgregoComentario;
}

export async function reportarReview(idPublicacion) {
  var seReporto = false;
  
  if(Review.exists({IdPublicacion: idPublicacion, Estatus: ACTIVO })){
    return Review.updateOne(
      {IdPublicacion: idPublicacion},
      {Estatus: REPORTADO}
    )
    .then(seActualizo => {
      if(seActualizo){
        seReporto = true;
      } 
      return seReporto;
    })
    .catch(error => {
      console.error(error);
      return seReporto;
    });
  }
  return seReporto;
}

export async function obtenerReviews(texto) {
  var filtro = {};

  if (texto) {
    filtro.$or = [
      { Titulo: { $regex: texto, $options: INCLUIR } },
      { Etiquetas: { $regex: texto, $options: INCLUIR } },
    ];
    filtro.$and = [
      { Estatus: ACTIVO }
    ];

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
    return await Review.find({ Estatus: ACTIVO });
  }
}
  
export async function obtenerReviewDatos(id) {
  return await Review.find({ IdPublicacion: id, Estatus: ACTIVO });
}

export async function esReviewActivo(id) {
  return Review.exists({ IdPublicacion: id, Estatus: ACTIVO })
  .then((existe) => {
    return existe;
  })
  .catch((err) => {
    console.error(err);
    return false;
  });
}