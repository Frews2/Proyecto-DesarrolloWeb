import { Guid } from 'js-guid';;
import Noticia from '../modelos/noticia.js';
import { guardarImagen } from '../utilidades/servicioImagen.js';
import { ACTIVO, REPORTADO, ORDEN_DESCENDIENDO } from '../utilidades/constantes.js';

export async function guardarNoticia(nuevaNoticia) {
  const CARPETA = 'noticias';
  const { Foto } = nuevaNoticia;
  const GUID = Guid.newGuid();
  var nombreArchivo = GUID + nuevaNoticia.NombreFoto + nuevaNoticia.TipoFoto;
  var archivoSinExtension = GUID + nuevaNoticia.NombreFoto;
  var rutaImagen = '';

  var resultadoJson = {
    exito: true,
    origen: 'noticia/Registrar',
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
  }

  var noticiaAGuardar = new Noticia(noticia);

  return noticiaAGuardar.save()
  .then((seGuardo) => {
    console.log('NOTICIA GUARDADA: ' + seGuardo);

    if(!seGuardo) {
      resultadoJson.exito = false;
      resultadoJson.mensaje = 'Error: Ocurrió un error al intentar crear la noticia. Intenté de nuevo.'
    } else {
      resultadoJson.resultado = 'Ruta de imagen es: ' + seGuardo.Foto;
    }

    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.exito = false;
    resultadoJson.mensaje = 'ERROR: Ocurrió un error al intentar crear la noticia. Intenté de nuevo.';
    return resultadoJson;
  })
}

export async function agregarComentarioANoticia(idPublicacion, idComentario) {
  var seAgregoComentario = false

  if(Noticia.exists({IdPublicacion: idPublicacion})){
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

export async function reportarNoticia(idPublicacion) {
  var seReporto = false
  
  if(Noticia.exists({IdPublicacion: idPublicacion})){
    return Noticia.updateOne(
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

export async function eliminarNoticia(id) {
  return Noticia.deleteOne({IdPublicacion: id})
  .then(exito => {
    return exito.ok == 1;
  })
  .catch(error => {
    console.error(error);
  return false;
  })
}

export async function obtenerNoticias(texto) {
  var filtro = {};
  if (texto) {
    filtro.$or = [
      { Titulo: { $regex: texto, $options: 'i' } },
      { Etiquetas: { $regex: texto, $options: 'i' } },
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
    return await Noticia.find();
  }
}
  
export async function obtenerNoticiaDatos(identificador) {
  return await Noticia.find({ IdPublicacion: identificador });
}

export async function esNoticiaActiva(idPublicacion) {
  return Noticia.exists({ IdPublicacion: idPublicacion, Estatus: ACTIVO })
  .then((existe) => {
    return existe;
  })
  .catch((err) => {
    console.error(err);
    return false;
  });
}