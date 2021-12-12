import express from "express";
import { validationResult, checkSchema } from "express-validator";
import { guardarReview, obtenerReviewDatos,
  obtenerReviews } from '../controladores/reviewControlador.js';
import checkSchemaReview from "../utilidades/reviewValidador.js";
import { ChecarTokenActivo } from "../utilidades/tokenValidador.js";

const router = express.Router();

router.post("/registrar", 
ChecarTokenActivo,
checkSchema(checkSchemaReview),
async (req, res) => {
  const { errors } = validationResult(req);

  var respuestaJson = {
    exito: false,
    origen: 'reviews/registrar',
    mensaje: 'ERROR: No pudimos registrar el review',
    resultado: null,
    tokenValido: true
  };

  if (errors.length > 0) {
    respuestaJson.mensaje = 'Se encontaron errores al validar el review. ' +
      'Corrijalos por favor.';
    respuestaJson.resultado = errors;
    return res.status(400).send(respuestaJson).end();
  }

  var nuevoReview = req.body;

  Review.exists({ Titulo: nuevoReview.Titulo })
  .then((existe) => {
    if (existe) {
      respuestaJson.mensaje = 'ERROR: El titulo: ' + nuevoReview.Titulo + 
        ', ya pertenece a un review. Cambielo por favor.';
      return res.status(422).send(respuestaJson);
    } else {
      if (req.files && req.files.Foto ) {
        nuevaFigura.Foto = req.files.Foto;
      } else{
        respuestaJson.mensaje = 'ERROR: No se encuentra una foto adjunta';
        return res.status(406).send(respuestaJson).end();
      }
      
      guardarReview(nuevoReview)
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
      'Ocurrió un error inesperado al registrar el review.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

router.get('/buscar',
async (req, res) => {
  const { filtro, id } = req.query;
  
  var respuestaJson = {
    exito: false,
    origen: 'reviews/buscar',
    mensaje: 'ERROR: ' +
      'No pudimos encontrar un review con el filtro ingresado.',
    resultado: null
  };

  if (id) {
    return obtenerReviewDatos(id)
    .then((reviewEncontrado) => {
      if (reviewEncontrado && reviewEncontrado.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.resultado = reviewEncontrado;
        respuestaJson.mensaje = 'ÉXITO: Review encontrado.';
      } 
      return res.status(200).send(respuestaJson);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar un review. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  } else{
    obtenerReviews(filtro)
    .then((reviews) => {
      if (reviews && reviews.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.resultado = reviews;
        respuestaJson.mensaje = 'ÉXITO: Reviews encontrados.';
      } 
      return res.status(200).send(respuestaJson);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar reviews. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  }
});

export default router;