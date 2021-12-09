import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import { validationResult, checkSchema } from 'express-validator';
import Cuenta from '../modelos/cuenta.js';
import { existeCuenta, guardarCuenta, existePeriodistaActivo, 
  existeColeccionistaActivo } from '../controladores/cuentaControlador.js';
import esSchemaCuentaValido from '../utilidades/cuentaValidador.js'; 
import { ChecarTokenActivo } from '../utilidades/tokenValidador.js';
import { PENDIENTE, REPORTADO } from '../utilidades/constantes.js';

const router = express.Router();

router.post('/registrar',
checkSchema(esSchemaCuentaValido),
async (req, res) => {
  var usuario = req.body;

  var respuestaJson = {
    exito: false,
    origen: 'cuentas/registrar',
    mensaje: 'ERROR: No pudimos registrar su cuenta',
    resultado: null,
    tokenValido: true
  };

  const { errors } = validationResult(req);

  if (errors.length > 0) {
    respuestaJson.mensaje = 'Se encontaron errores al validar la cuenta. ' +
      'Corrijalos por favor.';
    respuestaJson.resultado = errors;
    return res.status(500).send(respuestaJson).end();
  }

  existeCuenta(usuario.Email)
  .then((existe) => {
    if (existe) {
      respuestaJson.mensaje = 'ERROR: El correo: ' + usuario.Email + 
        ', ya pertenece a una cuenta. Utilize otro email.';
      return res.status(422).send(respuestaJson);
    } else {
      guardarCuenta(usuario)
      .then(resultadoCreacion => {
        respuestaJson.mensaje = resultadoCreacion.mensaje;
        respuestaJson.resultado = resultadoCreacion.resultado;
        respuestaJson.mensaje = 'EXITO: Cuenta guardada en sistema.';
          
        if (resultadoCreacion.exito) {
          respuestaJson.exito = true;
          return res.status(201).send(respuestaJson);
        } else {
          return res.status(400).send(respuestaJson);
        }
      });
    }
  })
  .catch((error) => {
    console.error('ERROR: ' + error);
    respuestaJson.mensaje = 'ERROR: ' +
      'Ocurrió un error inesperado al registrar el usuario.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

router.post('/login', async (req, res) => {
  var respuestaJson = {
    exito: false,
    origen: 'cuentas/login',
    mensaje: 'ERROR: Autentificación fallida. No se pudo iniciar sesión',
    resultado: null,
    tokenValido: true
  };

  return Cuenta.findOne({ Email: req.body.Email })
  .then((cuentaEncontrada) => {
    if (cuentaEncontrada == null) {
      return res.status(401).send(respuestaJson);    
    } else {
      if(cuentaEncontrada.Estatus == REPORTADO){
        respuestaJson.mensaje = 'Su cuenta esta baneada. ' + 
          'No puede accesar el sistema';
          return res.status(201).send(respuestaJson).end();  
      }

      if(cuentaEncontrada.Estatus == PENDIENTE){
        respuestaJson.mensaje = 'Su cuenta necesita ser verificada. ' + 
          'Solicita correo de verificación para dar de alta su cuenta';
          return res.status(201).send(respuestaJson).end(); 
      }

      bcrypt.compare(req.body.Password,
        cuentaEncontrada.Password,
        (err, respuesta) => {
          if (err) {
            return res.status(401).send(respuestaJson);
          }

          if (respuesta) {
            const TOKEN = jwt.sign(
              {
                IdCuenta: cuentaEncontrada.IdCuenta,
                Email: cuentaEncontrada.Email,
                TipoCuenta: cuentaEncontrada.TipoCuenta,
                Apodo: cuentaEncontrada.Apodo
              },
              process.env.JWT_KEY, 
              {
                expiresIn: '2h'
              }
            );
            respuestaJson.exito = true;
            respuestaJson.mensaje = 'Éxito: Sesión iniciada.';
            respuestaJson.resultado = TOKEN;
            return res.status(200).send(respuestaJson);
          } else {
            return res.status(401).send(respuestaJson);
          }
      });
    }
  })
  .catch((error) => {
    console.error('ERROR: ' + error);
    respuestaJson.mensaje = 'ERROR: Ocurrió un error inesperado ' +
      'y no pudimos iniciar sesión. Intente más tarde.';
    respuestaJson.resultado = error;
    return res.status(500).send(respuestaJson);
  });
});

router.get('/verificarPeriodista', 
ChecarTokenActivo,
async (req, res) => {
  const {Email} = req.query;

  var respuestaJson = {
    exito: false,
    origen: 'cuentas/verificarPeriodista',
    mensaje: 'ERROR: El correo no pertenece a periodista activo.',
    resultado: null,
    tokenValido: true
  };
  
  if (existePeriodistaActivo(Email)) {
    respuestaJson.resultado = true;
    respuestaJson.mensaje = 'ÉXITO: El correo es de un periodista activo';
    return res.status(200).send(respuestaJson);
  } else {
    return res.status(405).send(respuestaJson);
  }
});

router.get('/verificarColeccionista', 
ChecarTokenActivo,
async (req, res) => {
  const {Email} = req.query;

  var respuestaJson = {
    exito: false,
    origen: 'cuentas/verificarColeccionista',
    mensaje: 'ERROR: El correo no pertenece a coleccionista activo',
    resultado: null,
    tokenValido: true
  };
  
  if (existeColeccionistaActivo(Email)) {
    respuestaJson.resultado = true;
    respuestaJson.mensaje = 'ÉXITO: El correo es de un coleccionista activo';
    return res.status(200).send(respuestaJson);
  } else {
    return res.status(405).send(respuestaJson);
  }
});

export default router;