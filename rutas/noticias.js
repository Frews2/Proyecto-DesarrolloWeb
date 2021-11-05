import express from "express";
import { validationResult, checkSchema } from "express-validator";
import { guardarNoticia, obtenerNoticias } from '../controladores/noticiaControlador.js';
import checkSchemaNoticia from "../utilidades/noticiaValidador.js";
import { ChecarTokenActivo } from "../utilidades/tokenValidador.js";

const router = express.Router();

router.post("/Registrar", 
ChecarTokenActivo,
checkSchema(checkSchemaNoticia),
async (req, res) => {

  const { errors } = validationResult(req);

    var respuestaJSON = {
        exito: true,
        origen: "noticias/Register",
        mensaje: "EXITO: Noticia guardada",
        resultado: null
    };

  if (errors.length > 0) {
    respuestaJSON.exito = false;
    respuestaJSON.mensaje = "Se encontaron errores al validar la noticia. Corrijalos por favor.";
    respuestaJSON.resultado = errors;
    return res.status(400).send(respuestaJSON).end();
  }

  var nuevaNoticia = req.body;

  if(req.files && req.files.Foto) {
    nuevaNoticia.Foto = req.files.Foto;
  }
  
    guardarNoticia(nuevaNoticia.IdCuenta, nuevaNoticia)
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
        console.error(error)

        respuestaJSON.exito = false;
        respuestaJSON.mensaje = "Ocurrió un error al intentar crear la noticia. Intente más tarde."
        respuestaJSON.resultado = error;

        return res.status(500).send(respuestaJSON);
    })
})


router.get("/buscar", async (req, res) => {
    const busqueda = req.query;

    var respuestaJSON = {
        exito: true,
        origen: "noticias/buscar",
        mensaje: "EXITO: Noticias encontradas",
        resultado: null
    };

    obtenerNoticias(busqueda)
      .then((noticias) => {
        if (noticias && noticias.length > 0) {
            respuestaJSON.resultado = noticias;

            return res.status(200).send(respuestaJSON);
        } else {
            respuestaJSON.exito = false;
            respuestaJSON.mensaje = "No se encontraron noticias";
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