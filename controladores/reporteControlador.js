import { Guid } from 'js-guid';
import Reporte from '../modelos/reporte.js';
import { reportarNoticia } from '../controladores/noticiaControlador.js';
import { reportarReview } from '../controladores/reviewControlador.js';
import { reportarComentario } from '../controladores/comentarioControlador.js';

export async function guardarReporte(nuevoReporte) {
  const NOTICIA = 'Noticia';
  const REVIEW = 'Review';
  const COMENTARIO = 'Comentario';
  const GUID = Guid.newGuid();

  var resultadoJson = {
    exito: false,
    origen: 'reporte/Registrar',
    mensaje: 'Error: No pudimos registrar el reporte. Intenté de nuevo.',
    resultado: null
  };

  var reporte = {
    IdReporte: GUID,
    IdPublicacion: nuevoReporte.IdPublicacion,
    TipoPublicacion: nuevoReporte.TipoPublicacion,
    IdAcusador: nuevoReporte.IdAcusador,
    Razon: nuevoReporte.Razon,
    IdAcusado: nuevoReporte.IdAcusado
  };

  var reporteAGuardar = new Reporte(reporte);

  return reporteAGuardar.save()
  .then((seGuardo) => {
    console.log('REPORTE GUARDADO: ' + seGuardo);

    if(seGuardo) {
      var seActualizo = false;

      switch(reporteAGuardar.TipoPublicacion){
        case NOTICIA: 
          seActualizo = reportarNoticia(reporteAGuardar.IdPublicacion);
          break;
        case REVIEW: 
          seActualizo = reportarReview(reporteAGuardar.IdPublicacion);
          break;
        case COMENTARIO: 
          seActualizo = reportarComentario(reporteAGuardar.IdPublicacion);
          break;  
      }

      if(seActualizo){
        resultadoJson.exito = true;
        resultadoJson.mensaje = 'ÉXITO: Reporte Guardado.';
      } else{
        resultadoJson.mensaje = 'ERROR: No se logró reportar la publicación. ' +
        'Intente otra vez';
      }
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error('ERROR: ' + error);
    resultadoJson.mensaje = 'ERROR: ' +
      'Ocurrió un error al intentar registrar el reporte. Intenté de nuevo.';
    return resultadoJson;
  });
}
