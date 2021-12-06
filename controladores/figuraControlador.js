import { Guid } from 'js-guid';
import Figura from '../modelos/figura.js';
import { guardarImagen } from '../utilidades/servicioImagen.js';

export async function existeFigura(idFigura) {
  return Figura.exists({ IdFigura: idFigura})
  .then((existe) => {
    return existe;
  })
  .catch((err) => {
    console.error(err);
    return false;
  });
}
export async function guardarFigura(nuevaFigura) {
  const CARPETA = 'figuras';
  const { Foto } = nuevaFigura;
  const GUID = Guid.newGuid();
  var nombreArchivo = GUID + nuevaFigura.NombreFoto + nuevaFigura.TipoFoto;
  var archivoSinExtension = GUID + nuevaFigura.NombreFoto;
  var rutaImagen = '';

  var resultadoJson = {
    exito: true,
    origen: 'figura/Registrar',
    mensaje: 'EXITO: Figura guardada',
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

  var figura = {
    IdFigura: GUID,
    Nombre: nuevaFigura.Nombre,
    Altura: nuevaFigura.Altura,
    Material: nuevaFigura.Material,
    Marca: nuevaFigura.Marca,
    Foto: rutaImagen,
    NombreFoto: archivoSinExtension,
    TipoFoto: nuevaFigura.TipoFoto,
    DescripcionFoto: nuevaFigura.DescripcionFoto,
  }

  var figuraAGuardar = new Figura(figura);

  return figuraAGuardar.save()
  .then((seGuardo) => {
    console.log('FIGURA GUARDADA: ' + seGuardo);

    if(!seGuardo) {
      resultadoJson.exito = false;
      resultadoJson.mensaje = 'Error: ' +
      'Ocurrió un error al intentar guardar la figura. Intenté de nuevo.';
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.exito = false;
    resultadoJson.mensaje = 'ERROR: ' +
    'Ocurrió un error al intentar crear la figura. Intenté de nuevo.';
    return resultadoJson;
  })
}

export async function obtenerFiguras(texto) {
  var filtro = {};
  if (texto) {
    filtro.$or = [
      { Nombre: { $regex: texto, $options: 'i' } },
      { Marca: { $regex: texto, $options: 'i' } },
    ];

    return Figura.find(filtro)
    .then((figuras) => {
      return figuras;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  } else {
    return await Figura.find();
  }
}

export async function obtenerFiguraDatos(identificador) {
  return await Figura.findOne({ IdFigura: identificador });
}
