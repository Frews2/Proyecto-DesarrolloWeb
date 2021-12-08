import express from "express";
import { validationResult, checkSchema } from "express-validator";
import { guardarNoticia, obtenerNoticias, obtenerNoticiaDatos } from '../controladores/noticiaControlador.js';
import checkSchemaNoticia from "../utilidades/noticiaValidador.js";
import { ChecarTokenActivo } from "../utilidades/tokenValidador.js";

const router = express.Router();

router.post("/registrar", 
ChecarTokenActivo,
checkSchema(checkSchemaNoticia),
async (req, res) => {
  const { errors } = validationResult(req);

  var respuestaJson = {
    exito: false,
    origen: 'noticias/registrar',
    mensaje: 'ERROR: No pudimos registrar la noticia',
    resultado: null,
    tokenValido: true
  };

  if (errors.length > 0) {
    respuestaJson.mensaje = 'Se encontaron errores al validar la noticia. ' +
      'Corrijalos por favor.';
    respuestaJson.resultado = errors;
    return res.status(400).send(respuestaJson).end();
  }

  var nuevaNoticia = req.body;

  Noticia.exists({ Titulo: nuevaNoticia.Titulo })
  .then((existe) => {
    if (existe) {
      respuestaJson.mensaje = 'ERROR: El titulo: ' + nuevaNoticia.Titulo + 
        ', ya pertenece a una noticia. Cambielo por favor.';
      return res.status(422).send(respuestaJson);
    } else {
      if (req.files && req.files.Foto) {
        nuevaNoticia.Foto = req.files.Foto;
      }
      
      guardarNoticia(nuevaNoticia)
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
      'Ocurrió un error inesperado al registrar la noticia.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

router.get('/buscar',
async (req, res) => {
  const { filtro, id } = req.query;
  
  var respuestaJson = {
    exito: false,
    origen: 'noticias/buscar',
    mensaje: 'ERROR: ' +
      'No pudimos encontrar una noticia con el filtro ingresado.',
    resultado: null
  };

  if (id) {
    return obtenerNoticiaDatos(id)
    .then((noticiaEncontrada) => {
      if (noticiaEncontrada && noticiaEncontrada.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.resultado = noticiaEncontrada;
      } 
      return res.status(200).send(respuestaJson);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar una noticia. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  } else{
    obtenerNoticias(filtro)
    .then((noticias) => {
      if (noticias && noticias.length > 0) {
        respuestaJson.exito = true;
        respuestaJson.resultado = noticias;
      } 
      return res.status(200).send(respuestaJson);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
      respuestaJson.mensaje = 'ERROR: ' +
        'Ocurrió un error al intentar buscar noticias. Intente más tarde.';
      respuestaJson.resultado = error;
      return res.status(500).send(respuestaJson);
    });
  }
});

export default router;