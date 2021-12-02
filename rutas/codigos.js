import express from "express";
import { checarCodigoConfirmacion, eliminarCodigoGuardado, enviarCorreo } from "../controladores/codigoControlador.js";
import { activarCuenta } from "../controladores/cuentaControlador.js";

const router = express.Router();

router.post("/Verificar", async (req, res) => {
  const { Correo, Numero } = req.body;

  var respuestaJSON = {
    exito: true,
    origen: "codigos/Verificar",
    mensaje: "EXITO: CUENTA ACTIVADA CON CODIGO EXITOSO",
    resultado: null
  };

  checarCodigoConfirmacion(Correo, Numero)
    .then((resultado) => {
      if (resultado.esCorrecto) {
        activarCuenta(Correo)
          .then((activado) => {
            if (activado) {
              respuestaJSON.mensaje = resultado.mensaje;

              eliminarCodigoGuardado(Correo, Numero)
                .then((eliminado) => console.log("EXITO: Código eliminado exitosamente: ", eliminado))
                .catch((error) => console.error(error));
              return res.status(200).send(respuestaJSON);
            } else {
              resultado.exito = false;
              resultado.mensaje = "ERROR: Ocurrió un error al intentar activar la cuenta. Intente más tarde.";
              return res.status(500).send(respuestaJSON);
            }
          })
          .catch((error) => console.errror(error));
      } else {
        respuestaJSON.exito = resultado.esCorrecto;
        respuestaJSON.mensaje = resultado.mensaje;
        return res.status(400).send(respuestaJSON);
      }
    })
    .catch((error) => {
      console.error(error);
      respuestaJSON.exito = false;
      respuestaJSON.mensaje = "ERROR: Ocurrió un error al intentar validar el código. Intenté más tarde.";
      respuestaJSON.resultado = error;
      return res.status(500).send(respuestaJSON);
    });
});

router.post("/EnviarCorreo", async (req, res) => {
  const { Correo, TipoCuenta } = req.body;

  var respuestaJSON = {
    exito: true,
    origen: "codigos/EnviarCorreo",
    mensaje: "EXITO: Correo Enviado",
    resultado: null
  };

  enviarCorreo(Correo, TipoCuenta)
    .then((resultado) => {
      if (resultado.exito) {
        return res.status(200).send(respuestaJSON);
        } else {
          resultado.exito = false;
          resultado.mensaje = "ERROR: No se mandó el correo. Intente más tarde.";
          return res.status(500).send(respuestaJSON);
        }
    })
    .catch((error) => {
      console.error(error);
      respuestaJSON.exito = false;
      respuestaJSON.mensaje = "ERROR: Ocurrió un error al intentar mandar el código. Intenté más tarde.";
      respuestaJSON.resultado = error;
      return res.status(500).send(respuestaJSON);
    });
});

export default router;
