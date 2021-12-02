import express, { Router } from "express";
import { validationResult, checkSchema } from "express-validator";
import { guardarComentario, obtenerComentarios } from '../controladores/comentarioControlador.js';
import checkSchemaReview from "../utilidades/comentarioValidador.js";
import { ChecarTokenActivo } from "../utilidades/tokenValidador.js";

const router = express.Router();

router.post("/Registrar", 
ChecarTokenActivo,
checkSchema(checkSchemaReview),
async (req, res) => {

  const { errors } = validationResult(req);

    var respuestaJSON = {
        exito: true,
        origen: "comentario/Registrar",
        mensaje: "EXITO: Comentario guardado",
        resultado: null
    };

    if (errors.length > 0) {
        respuestaJSON.exito = false;
        respuestaJSON.mensaje = "Se encontaron errores al validar el comentario. Corrijalos por favor.";
        respuestaJSON.resultado = errors;
        return res.status(400).send(respuestaJSON).end();
    }

    var nuevoComentario = req.body;
  
    guardarComentario(nuevoComentario)
    .then(resultadoCreacion => {
        if (resultadoCreacion.exito) {
            respuestaJSON.mensaje = resultadoCreacion.mensaje;
            respuestaJSON.resultado = resultadoCreacion.resultado;
          return res.status(200).send(respuestaJSON);
        } else {
            respuestaJSON.exitoso = false;
            respuestaJSON.mensaje = resultadoCreacion.mensaje;
            res.status(400).send(respuestaJSON);
        }
    })
    .catch(error => {
        console.error(error);

        respuestaJSON.exito = false;
        respuestaJSON.mensaje = "Ocurrió un error al intentar registrar el comentario. Intente más tarde."
        respuestaJSON.resultado = error;

        return res.status(500).send(respuestaJSON);
    })
})


router.get("/buscar",
ChecarTokenActivo,
async (req, res) => {
    var IdPublicacion = req.query.IdPublicacion;

    var respuestaJSON = {
        exito: true,
        origen: "comentarios/buscar",
        mensaje: "EXITO: Comentarios encontrados",
        resultado: null
    };

    obtenerComentarios(IdPublicacion)
      .then((comentarios) => {
        if (comentarios && comentarios.length > 0) {
            respuestaJSON.resultado = comentarios;

            return res.status(200).send(respuestaJSON);
        } else {
            respuestaJSON.exito = false;
            respuestaJSON.mensaje = "No se encuentran comentarios para esta publicacion.";
            return res.status(405).send(respuestaJSON);
        }
      })
      .catch((error) => {
        console.error(error);
        respuestaJSON.exito = false;
        respuestaJSON.mensaje = error.message;
        respuestaJSON.resultado = error;

        return res.status(500).send(respuestaJSON);
      });
})

export default router;