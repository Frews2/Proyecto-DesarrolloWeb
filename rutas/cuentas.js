import bcrypt  from "bcrypt";
import jwt from 'jsonwebtoken';
import express from "express";
import { validationResult, checkSchema } from "express-validator";
import Cuenta from "../modelos/cuenta.js";
import { existeCuenta, guardarCuenta } from "../controladores/cuentaControlador.js";
import esSchemaCuentaValido from '../utilidades/cuentaValidador.js'; 


const router = express.Router();

router.post("/Registrar", checkSchema(esSchemaCuentaValido), async (req, res) => {
  const usuario = req.body;

  var respuestaJSON = {
    exito: true,
    origen: "cuentas/Registrar",
    mensaje: "",
    resultado: null,
  };

  const { errors } = validationResult(req);

  if (errors.length > 0) {
    respuestaJSON.exito = false;
    respuestaJSON.mensaje = "ERROR: Unos campos de Cuenta son invalidos.";
    respuestaJSON.resultado = errors;
    return res.status(500).send(respuestaJSON).end();
  }

  existeCuenta(usuario.Email)
    .then((existe) => {
      if (existe) {
        respuestaJSON.exito = false
        respuestaJSON.mensaje = "ERROR: El correo: " + usuario.Email + ", ya pertenece a una cuenta. Utilize otro email."
        return res.status(422).send(respuestaJSON)
      } else {
        guardarCuenta(usuario)
          .then(guardado => {
            if(guardado){
              respuestaJSON.mensaje = "EXITO: Cuenta guardada en sistema."
              return res.status(201).send(respuestaJSON);
            }
            else {
              respuestaJSON.exito = false
              respuestaJSON.mensaje = "ERROR: Ocurrió un error inesperado al registrar el usuario."
              return res.status(400).send(respuestaJSON);
            }
          }) 
        }
    })
    .catch((error) => {
      console.error(error);
      respuestaJSON.exito = false
      respuestaJSON.mensaje = "ERROR: Ocurrió un error inesperado al registrar el usuario."
      respuestaJSON.data = error
      return res.status(500).send(respuestaJSON)
    });
});

router.post("/Login", async (req, res) => {
  return Cuenta.findOne({ Email: req.body.Email })
  .then((cuentaEncontrada) => {
    if (cuentaEncontrada == null) {
      return res.status(401).json({
        exito: false,
        origen: "cuentas/Login",
        mensaje: "ERROR: Autentificación falliida. Email no encontrado No se pudo iniciar sesión",
        resultado: null
      });      
    } else {
      bcrypt.compare(req.body.Password, cuentaEncontrada.Password, (err, respuesta) => {
        if (err) {
          return res.status(401).json({
            exito: false,
            origen: "cuentas/Login",
            mensaje: cuentaEncontrada.Password + " ERROR: Autentificación falliida. No se pudo iniciar sesión " + usuario.Password,
            resultado: null
          });
        }
        if (respuesta) {
          const token = jwt.sign(
            {
              Email: cuentaEncontrada.Email,
              TipoCuenta: cuentaEncontrada.TipoCuenta,
              Apodo: cuentaEncontrada.Apodo,
              IdCuenta: cuentaEncontrada.IdCuenta
            },
            process.env.JWT_KEY, 
            {
              expiresIn: "2h"
            }
          );
          return res.status(200).json({
            exito: true,
            origen: "cuentas/Login",
            mensaje: "EXITO: Sesión Iniciada",
            resultado: token
          })
        } else {
          return res.status(401).json({
            exito: false,
            origen: "cuentas/Login",
            mensaje: cuentaEncontrada.Password + " ERROR: Autentificación falliida. No se pudo iniciar sesión " + usuario.Password,
            resultado: null
          });
        }
      });
    }
  })
  .catch(() => {
    return res.status(500).json({
      exito: false,
      origen: "cuentas/Login",
      mensaje: "ERROR: Ocurrió un error. No se puede iniciar sesión",
      resultado: null
    })
  });
})

export default router;