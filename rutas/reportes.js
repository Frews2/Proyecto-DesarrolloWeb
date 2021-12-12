import express from 'express';
import { validationResult, checkSchema } from 'express-validator';
import { guardarReporte } from '../controladores/reporteControlador.js';
import checkSchemaReporte from '../utilidades/reporteValidador.js';
import { ChecarTokenActivo } from '../utilidades/tokenValidador.js';

const router = express.Router();

router.post('/registrar', 
ChecarTokenActivo,
checkSchema(checkSchemaReporte),
async (req, res) => {
  const { errors } = validationResult(req);

  var respuestaJson = {
    exito: false,
    origen: 'reportes/registrar',
    mensaje: 'ERROR: No pudimos registrar su reporte',
    resultado: null,
    tokenValido: true
  };

  if (errors.length > 0) {
    respuestaJson.mensaje = 'Se encontaron errores al validar el reporte. ' +
      'Corrijalos por favor.';
    respuestaJson.resultado = errors;
    return res.status(400).send(respuestaJson).end();
  }

  var nuevoReporte = req.body;
  
  guardarReporte(nuevoReporte)
  .then(resultadoCreacion => {
    respuestaJson.mensaje = resultadoCreacion.mensaje;
    respuestaJson.resultado = resultadoCreacion.resultado;

    if (resultadoCreacion.exito) {
      
      respuestaJson.exito = true;
      return res.status(200).send(respuestaJson);
    } else {
      res.status(400).send(respuestaJson);
    }
  })
  .catch(error => {
    console.error('ERROR: ' + error);
    respuestaJson.mensaje = 'ERROR: ' +
    'Ocurrió un error al intentar registrar el reporte. Intente más tarde.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

export default router;