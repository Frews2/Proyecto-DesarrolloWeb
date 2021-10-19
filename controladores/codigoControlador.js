import Codigo from "../modelos/codigo.js";

export async function guardarCodigoConfirmacion(email, codigoActual) {
    const nuevoCodigo = new Codigo({
      Correo: email,
      Numero: codigoActual,
    });

    return nuevoCodigo.save()
        .then(codigoGuardado => {
            if(codigoGuardado){
              return true
            } else {
              return false
            }
        })
        .catch(error => {
          console.error(error);
          return false;
        })
}

export async function checarCodigoConfirmacion(email, codigoActual) {
    return Codigo.findOne({Correo: email})
        .then(codigo => {
            var resultado = {
              esCorrecto: true,
              mensaje: "Código de confirmación de cuenta correcto.",
            };
            if (!codigo) {
              resultado.esCorrecto = false
              resultado.mensaje = "Autentificación fallida. Verifique que ingresaste el email correspondiente y el código de confirmación no ha expirado."
            }
            else if (codigo.Numero != codigoActual) {
              resultado.esCorrecto = false
              resultado.mensaje = "El código de confirmación de cuenta es incorrecto."
            }
            return resultado
        })
        .catch(error => {
          console.error(error);
          return {
            esCorrecto: false,
            mensaje: error.message
          }
        })
}

export async function eliminarCodigoGuardado(email, codigoActual) {
  return Codigo.deleteOne({
    Correo: email,
    Numero: codigoActual,
  })
    .then((resultadoEliminacion) => {
      return resultadoEliminacion.ok == 1;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}