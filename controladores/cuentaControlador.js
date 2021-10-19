import { Guid } from "js-guid";

import Cuenta from "../modelos/cuenta.js";
import { guardarCodigoConfirmacion } from "../controladores/codigoControlador.js";
import mandarCodigoConfirmacion from "../utilidades/servicioEmail.js";
import generarCodigoAzar from "../utilidades/generadorCodigo.js";
import { encriptar } from "../utilidades/generadorBcrypt.js";

export function existeCuenta(email) {
  return Cuenta.findOne({ Email: email })
    .then((cuenta) => {
      if (cuenta) return true;

      return false;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function guardarCuenta(usuario) {
  const GUID = Guid.newGuid();
  usuario.IdCuenta = GUID;
  const passwordEncriptado = encriptar(usuario.Password);
  usuario.Password = passwordEncriptado;
  usuario.Estatus = "Pendiente";

  const nuevaCuenta = new Cuenta(usuario);

  return nuevaCuenta.save()
    .then((cuentaGuardada) => {
      if (cuentaGuardada) {
        const { Email, TipoCuenta } = cuentaGuardada;
        const numeroConfirmacion = generarCodigoAzar();

        return guardarCodigoConfirmacion(Email, numeroConfirmacion)
          .then((creado) => {
            if (creado) {
              mandarCodigoConfirmacion(
                Email,
                TipoCuenta,
                numeroConfirmacion
              );
            }

            return creado;
          })
          .catch((error) => {
            console.error(error);
            return false;
          });
      }

      return false;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

export async function activarCuenta(usuario) {
  const CUENTA_ACTIVA = {
    Estatus: 'Activo'
  }
  
  return Cuenta.updateOne({Apodo: usuario}, CUENTA_ACTIVA)
    .then(exito => {
      return exito.ok == 1;
    })
    .catch(error => {
    console.error(error);
      return false;
    })
}
/*
export async function hacerLogin(usuario) {
  return Cuenta.findOne({ Email: usuario.Email })
  .then((cuentaEncontrada) => {
    if (cuentaEncontrada == null) {
      return res.status(401).json({
        exito: false,
        origen: "cuentas/Login",
        mensaje: "ERROR: Autentificación falliida. Email no encontrado No se pudo iniciar sesión",
        resultado: null
      });      
    } else {
      bcrypt.compare(usuario.Password, cuentaEncontrada.Password, (err, respuesta) => {
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
              userId: cuentaEncontrada.Id,
              email: cuentaEncontrada.Email
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
}*/