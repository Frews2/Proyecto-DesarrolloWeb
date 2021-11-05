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

export async function existeCuentaActiva(idCuenta) {
  return Cuenta.exists({ IdCuenta: idCuenta, Estatus: "Activo"})
    .then((existe) => {
      return existe;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function existeCuentaActivaPeriodista(idCuenta) {
  return Cuenta.exists({ IdCuenta: idCuenta, TipoCuenta: "Periodista", Estatus: "Activo"})
    .then((existe) => {
      return existe;
    })
    .catch((err) => {
      console.error(err);
      return false;
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

export async function activarCuenta(correo) {
  const CUENTA_ACTIVA = {
    Estatus: 'Activo'
  }
  
  return Cuenta.updateOne({Email: correo}, CUENTA_ACTIVA)
    .then(exito => {
      return exito.ok == 1;
    })
    .catch(error => {
    console.error(error);
      return false;
    })
}
