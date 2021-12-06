import { Guid } from 'js-guid';
import Reporte from '../modelos/reporte.js';
import { ORDEN_ASCENDIENDO } from '../utilidades/constantes.js';

export async function guardarReporte(nuevoReporte) {
  const GUID = Guid.newGuid();

  var resultadoJson = {
    exito: true,
    origen: 'reporte/guardar',
    mensaje: 'EXITO: Reporte guardado',
    resultado: null
  };
  var reporte = {
    IdReporte: GUID,
    IdPublicacion: nuevoReporte.IdPublicacion,
    TipoPublicacion: nuevoReporte.TipoPublicacion,
    IdAcusador: nuevoReporte.IdAcusador,
    Razon: nuevoReporte.Razon,
    IdAcusado: nuevoReporte.IdAcusado
  }

  var reporteAGuardar = new Reporte(reporte);

  return reporteAGuardar.save()
  .then((seGuardo) => {
    console.log('REPORTE GUARDADO: ' + seGuardo);

    if(!seGuardo) {
      resultadoJson.exito = false;
      resultadoJson.mensaje = 'Error: Ocurrió un error al intentar registrar el reporte. Intenté de nuevo.'
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.exito = false;
    resultadoJson.mensaje = 'ERROR: Ocurrió un error al intentar crear el reporte. Intenté de nuevo.';
    return resultadoJson;
  })
}

export async function obtenerReportes() {
  return await Reporte.find()
    .sort({ FechaRegistro: ORDEN_ASCENDIENDO })
    .then((reportes) => {
      return reportes;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}
  
export async function obtenerReporteDatos(identificador) {
  return await Reporte.find({ IdReporte: identificador });
}