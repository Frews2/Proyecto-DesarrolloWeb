import express from "express";
import { validationResult, checkSchema } from "express-validator";
import { guardarReview, obtenerReviews } from '../controladores/reviewControlador.js';
import checkSchemaReview from "../utilidades/reviewValidador.js";
import { ChecarTokenActivo } from "../utilidades/tokenValidador.js";

const router = express.Router();

router.post("/Registrar", 
ChecarTokenActivo,
checkSchema(checkSchemaReview),
async (req, res) => {

  const { errors } = validationResult(req);

    var respuestaJSON = {
        exito: true,
        origen: "reviews/registrar",
        mensaje: "EXITO: Crítica guardada",
        resultado: null
    };

    if (errors.length > 0) {
        respuestaJSON.exito = false;
        respuestaJSON.mensaje = "Se encontaron errores al validar la crítica. Corrijalos por favor.";
        respuestaJSON.resultado = errors;
        return res.status(400).send(respuestaJSON).end();
    }

    var nuevaCritica = req.body;

    if(req.files && req.files.Foto) {
        nuevaCritica.Foto = req.files.Foto;
    }
  
    guardarReview(nuevaCritica)
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
        respuestaJSON.mensaje = "Ocurrió un error al intentar registrar la crítica. Intente más tarde."
        respuestaJSON.resultado = error;

        return res.status(500).send(respuestaJSON);
    })
})


router.get("/buscar",
ChecarTokenActivo,
async (req, res) => {
    const TEXTO_BUSQUEDA = req.query.filtro;

    var respuestaJSON = {
        exito: true,
        origen: "reviews/buscar",
        mensaje: "EXITO: Críticas encontradas",
        resultado: null
    };

    obtenerReviews(TEXTO_BUSQUEDA)
      .then((reviews) => {
        if (reviews && reviews.length > 0) {
            respuestaJSON.resultado = reviews;

            return res.status(200).send(respuestaJSON);
        } else {
            respuestaJSON.exito = false;
            respuestaJSON.mensaje = "No se encontraron críticas. Ingrese un filtro diferente.";
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

router.get("/obtenerPorId",
ChecarTokenActivo,
async (req, res) => {
    const ID_REVIEW = req.query.id;

    var respuestaJSON = {
        exito: true,
        origen: "reviews/obtenerPorId",
        mensaje: "EXITO: Críticas encontradas",
        resultado: null
    };

    obtenerReviews(ID_REVIEW)
      .then((reviews) => {
        if (reviews && reviews.length > 0) {
            respuestaJSON.resultado = reviews;

            return res.status(200).send(respuestaJSON);
        } else {
            respuestaJSON.exito = false;
            respuestaJSON.mensaje = "No se encontró una crítica. Ingrese una Id válida.";
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