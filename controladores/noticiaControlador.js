import { Guid } from 'js-guid';
import Noticia from '../modelos/noticia.js';
import { guardarImagen } from '../utilidades/servicioImagen.js';
import { ACTIVO, REPORTADO,
  ORDEN_DESCENDIENDO, FILTRO_INCLUIR } from '../utilidades/constantes.js';

export async function guardarNoticia(nuevaNoticia) {
  const CARPETA = 'noticias';
  const { Foto } = nuevaNoticia;
  const GUID = Guid.newGuid();
  var nombreArchivo = GUID + nuevaNoticia.NombreFoto + nuevaNoticia.TipoFoto;
  var archivoSinExtension = GUID + nuevaNoticia.NombreFoto;
  var rutaImagen = '';

  var resultadoJson = {
    exito: false,
    origen: 'noticia/Registrar',
    mensaje: 'ERROR: No pudimos registrar la noticia. Intenté de nuevo.',
    resultado: null
  };

  if(Foto.name != null){
    Foto.name = nombreArchivo;
  } else{
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
    resultadoJson.mensaje = respuestaGuardado.mensaje;
    return resultadoJson;
  }

  rutaImagen = respuestaGuardado.rutaImagen;

  var noticia = {
    IdPublicacion: GUID,
    Titulo: nuevaNoticia.Titulo,
    IdCuenta: nuevaNoticia.IdCuenta,
    IdFigura: nuevaNoticia.IdFigura,
    Texto: nuevaNoticia.Texto,
    Foto: rutaImagen,
    NombreFoto: archivoSinExtension,
    TipoFoto: nuevaNoticia.TipoFoto,
    DescripcionFoto: nuevaNoticia.DescripcionFoto,
    Etiquetas: nuevaNoticia.Etiquetas
  };

  var noticiaAGuardar = new Noticia(noticia);

  return noticiaAGuardar.save()
  .then((seGuardo) => {
    console.log('NOTICIA GUARDADA: ' + seGuardo);

    if(seGuardo) {
      resultadoJson.exito = true;
      resultadoJson.mensaje = 'ÉXITO: Noticia guardada';
      resultadoJson.resultado = 'Ruta de imagen es: ' + seGuardo.Foto;
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.mensaje = 'ERROR: ' +
      'Ocurrió un error al intentar crear la noticia. Intenté de nuevo.';
    return resultadoJson;
  });
}

export async function agregarComentarioANoticia(idPublicacion, idComentario) {
  var seAgregoComentario = false;

  if(Noticia.exists({IdPublicacion: idPublicacion, Estatus: ACTIVO})){
    return Noticia.updateOne(
      {IdPublicacion: idPublicacion},
      { $push: {comentarios: idComentario} })
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

export async function reportarNoticia(id) {
  var seReporto = false;
  
  if(Noticia.exists({IdPublicacion: id, Estatus: ACTIVO })){
    return Noticia.updateOne(
      {IdPublicacion: id},
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

export async function obtenerNoticias(texto) {
  var filtro = {};
  if (texto) {
    filtro.$and = [
      {$or: [
        { Titulo: { $regex: texto, $options: FILTRO_INCLUIR } },
        { Etiquetas: { $regex: texto, $options: FILTRO_INCLUIR } },
      ]},
      { Estatus: ACTIVO}
    ];
    
    return Noticia.find(filtro)
    .sort({ FechaRegistro: ORDEN_DESCENDIENDO})
    .then((noticias) => {
      return noticias;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  } else {
    return await Noticia.find({ Estatus: ACTIVO });
  }
}
  
export async function obtenerNoticiaDatos(id) {
  return await Noticia.find({ IdPublicacion: id, Estatus: ACTIVO });
}

export async function esNoticiaActiva(id) {
  return Noticia.exists({ IdPublicacion: id, Estatus: ACTIVO })
  .then((existe) => {
    return existe;
  })
  .catch((err) => {
    console.error(err);
    return false;
  });
}