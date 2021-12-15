import express from 'express';
import Codigo from '../modelos/codigo.js';
import { checarCodigoConfirmacion, eliminarCodigoGuardado,
  enviarCorreo } from '../controladores/codigoControlador.js';
import { activarCuenta } from '../controladores/cuentaControlador.js';

const router = express.Router();

router.post('/verificar', async (req, res) => {
  const { Correo, Numero } = req.body;

  var respuestaJson = {
    exito: false,
    origen: 'codigos/verificar',
    mensaje: 'ERROR: No pudimos verificar el código de confirmación',
    resultado: null
  };

  checarCodigoConfirmacion(Correo, Numero)
  .then((resultado) => {
    respuestaJson.exito = resultado.exito;
    respuestaJson.mensaje = resultado.mensaje;
    
    if (respuestaJson.exito) {
      activarCuenta(Correo)
      .then((activado) => {
        if (activado) {
          eliminarCodigoGuardado(Correo, Numero)
          .then((eliminado) => {
            if(eliminado){
              respuestaJson.exito = true;
            } else {
              respuestaJson.exito = false;
              respuestaJson.mensaje = 'Cuenta dada de alta pero, ' +
                'codigo de verificacion persiste en sistema.';
            }
          })
          .catch((error) => console.error('ERROR: ' + error));
          return res.status(200).send(respuestaJson);
        } else {
          respuestaJson.mensaje = 'ERROR: No pudimos activar su cuenta';
          return res.status(500).send(respuestaJson);
        }
      })
      .catch((error) => console.errror('ERROR: ' + error));
    } else {
      return res.status(400).send(respuestaJson);
    }
  })
  .catch((error) => {
    console.error('ERROR: ' + error);
    respuestaJson.mensaje = 'ERROR: ' +
      'Ocurrió un error al intentar validar el código. Intenté más tarde.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

router.post('/enviarCorreo', async (req, res) => {
  const { Correo } = req.body;

  var respuestaJson = {
    exito: false,
    origen: 'codigos/enviarCorreo',
    mensaje: 'ERROR: No se mandó el correo. Intente más tarde.',
    resultado: null
  };

  Codigo.exists({ Correo: req.body.Correo })
  .then((existe) => {
    if (!existe) {
      respuestaJson.mensaje = 'ERROR: El correo ingresado ' + 
        'no se encuentra en el sistema. Debe ingresar su correo de registro.';
      return res.status(422).send(respuestaJson);
    } else {
      enviarCorreo(Correo)
      .then((resultado) => {
        respuestaJson.mensaje = resultado.mensaje;
        if (resultado.exito) {
          respuestaJson.exito = true;
          return res.status(200).send(respuestaJson);
        } else {
          return res.status(500).send(respuestaJson);
        }
      })
      .catch((error) => {
        console.error('ERROR: ' + error);
        respuestaJson.mensaje = 'ERROR: ' +
          'Ocurrió un error al intentar mandar el correo. Intenté más tarde.';
        respuestaJson.resultado = error;
        return res.status(500).send(respuestaJson);
      });
    }
  })
  .catch((error) => {
    console.error('ERROR: ' + error);
    respuestaJson.mensaje = 'ERROR: ' +
      'Ocurrió un error al intentar mandar el correo. Intenté más tarde.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

export default router;
