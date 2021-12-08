import express from 'express';
import { validationResult, checkSchema } from 'express-validator';
import { guardarFigura, obtenerFiguras,
  obtenerFiguraDatos } from '../controladores/figuraControlador.js';
import checkSchemaFigura from '../utilidades/figuraValidador.js';
import { ChecarTokenActivo } from '../utilidades/tokenValidador.js';

const router = express.Router();

router.post('/registrar', 
ChecarTokenActivo,
checkSchema(checkSchemaFigura),
async (req, res) => {
  const { errors } = validationResult(req);

  var respuestaJson = {
    exito: false,
    origen: 'figuras/registrar',
    mensaje: 'ERROR: No pudimos registrar la figura',
    resultado: null,
    tokenValido: true
  };

  if (errors.length > 0) {
    respuestaJson.mensaje = 'Se encontaron errores al validar la figura. ' +
      'Corrijalos por favor.';
    respuestaJson.resultado = errors;
    return res.status(400).send(respuestaJson).end();
  }

  var nuevaFigura = req.body;

  Figura.exists({ Nombre: nuevaFigura.Nombre })
  .then((existe) => {
    if (existe) {
      respuestaJson.mensaje = 'ERROR: El nombre: ' + nuevaFigura.Nombre + 
        ', ya pertenece a una figura. Cambielo por favor.';
      return res.status(422).send(respuestaJson);
    } else {
      if (req.files && req.files.Foto) {
        nuevaFigura.Foto = req.files.Foto;
      }
      
      guardarFigura(nuevaFigura)
      .then(resultadoCreacion => {
        respuestaJson.mensaje = resultadoCreacion.mensaje;
        respuestaJson.resultado = resultadoCreacion.resultado;

        if (resultadoCreacion.exito) {
          respuestaJson.exito = true;
          return res.status(200).send(respuestaJson);
        } else {
          return res.status(400).send(respuestaJson);
        }
      });
    }
  })
  .catch(error => {
    console.error('ERROR: ' + error);
    respuestaJson.mensaje = 'ERROR: ' +
      'Ocurrió un error inesperado al registrar la figura.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

router.get('/buscar',
async (req, res) => {
  const { filtro, id } = req.query;
  
  var respuestaJson = {
    exito: false,
    origen: 'figuras/buscar',
    mensaje: 'ERROR: ' +
      'No pudimos encontrar una figura con el filtro ingresado',
    resultado: null
  };

  if (id) {
    return obtenerFiguraDatos(id)
    .then((figuraEncontrada) => {
      if (figuraEncontrada && figuraEncontrada.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.resultado = figuraEncontrada;
      } 
      return res.status(200).send(respuestaJson);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar una figura. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  } else{
    obtenerFiguras(filtro)
    .then((figuras) => {
      if (figuras && figuras.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.resultado = figuras;
      } 
      return res.status(200).send(respuestaJson);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar figuras. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  }
});

export default router;