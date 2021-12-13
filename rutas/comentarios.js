import express from 'express';
import { validationResult, checkSchema } from 'express-validator';
import { guardarComentario,
  obtenerComentarioDatos,
  obtenerComentarios } from '../controladores/comentarioControlador.js';
import checkSchemaComentario from '../utilidades/comentarioValidador.js';
import { ChecarTokenActivo } from '../utilidades/tokenValidador.js';

const router = express.Router();

router.post('/registrar', 
ChecarTokenActivo,
checkSchema(checkSchemaComentario),
async (req, res) => {
  const { errors } = validationResult(req);

  var respuestaJson = {
    exito: false,
    origen: 'comentarios/registrar',
    mensaje: 'ERROR: No pudimos registrar su comentario',
    resultado: null,
    tokenValido: true
  };

  if (errors.length > 0) {
    respuestaJson.mensaje = 'Se encontaron errores al validar el comentario. ' +
      'Corrijalos por favor.';
    respuestaJson.resultado = errors;
    return res.status(500).send(respuestaJson).end();
  }

  var nuevoComentario = req.body;
  
  guardarComentario(nuevoComentario)
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
    'Ocurrió un error al intentar registrar el comentario. Intente más tarde.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

router.get('/buscar',
async (req, res) => {
  const {idPublicacion, idComentario} = req.query;

  var respuestaJson = {
    exito: false,
    origen: 'comentarios/buscar',
    mensaje: 'ERROR: ' +
      'No pudimos encontrar una publicación con el filtro ingresado',
    resultado: null
  };

  if(!idPublicacion && !idComentario){
    respuestaJson.mensaje = 'ERROR: ' +
      'Debe ingresar una id de publicación o una id de comentario.';
    return res.status(400).send(respuestaJson);
  }
  if (idComentario) {
    return obtenerComentarioDatos(idComentario)
    .then((comentarios) => {
      if (comentarios && comentarios.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.mensaje = 'ÉXITO: Comentarios encontrados.';
        respuestaJson.resultado = comentarios;
        return res.status(200).send(respuestaJson);
      } else{
        return res.status(404).send(respuestaJson);
      }
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar el comentario. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  } else{
    obtenerComentarios(idPublicacion)
    .then((comentarios) => {
      if (comentarios && comentarios.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.mensaje = 'ÉXITO: Comentarios encontrados.';
        respuestaJson.resultado = comentarios;
        return res.status(200).send(respuestaJson);
      } else{
        return res.status(404).send(respuestaJson);
      }
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar el comentario. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  }
});

export default router;