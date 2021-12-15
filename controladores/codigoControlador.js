import Codigo from '../modelos/codigo.js';
import mandarCodigoConfirmacion from '../utilidades/servicioEmail.js';

export async function enviarCorreo(email) {
  var seMando;

  var resultadoJson = {
    exito: false,
    origen: 'codigo/EnviarCorreo',
    mensaje: 'Error: No se pudo enviar un correo a la cuenta',
    resultado: null
  };

  return Codigo.find({ Correo: email })
  .then(async codigoObtenido => {
    if (codigoObtenido) {
      seMando = await mandarCodigoConfirmacion(
        codigoObtenido.Correo,
        codigoObtenido.Numero);

        if(seMando){
          resultadoJson.mensaje = 'ÉXITO: Correo mandado';
        } else{
          resultadoJson.mensaje = 'ERROR: El email ingresado no es válido.';
        }
    } else{
      resultadoJson.mensaje = 'ERROR: El email ingresado no es válido.';
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.exito = false;
    resultadoJson.mensaje = 'ERROR: No se pudo mandar el correo ' +
      'en este momento.';
    return resultadoJson;
    });
}

export async function guardarCodigoConfirmacion(email, codigoActual) {
  var nuevoCodigo = new Codigo({
    Correo: email,
    Numero: codigoActual,
  });
  
  return nuevoCodigo.save()
  .then(codigoGuardado => {
    if (codigoGuardado) {
      return true;
    }
  })
  .catch(error => {
    console.error(error);
    return false;
  });
}

export async function checarCodigoConfirmacion(email, codigoActual) {
  var resultadoJson = {
    exito: false,
    mensaje: 'Autentificación fallida. ' +
      'Verifique que ingresaste el email correspondiente ' +
      'y el código de confirmación sean validos y no expiraron.'
  };

  return Codigo.findOne({Correo: email})
  .then(codigo => {
    if (!codigo) {
      resultadoJson.mensaje = 'ERROR: Email ingresado no pertenece ' +
        'a cuenta pendiente.';
    } else {
      if (codigo.Numero != codigoActual) {
        resultadoJson.mensaje = 'ERROR: El código de confirmación ' +
          'de cuenta es incorrecto.';
      } else {
        resultadoJson.exito = true;
        resultadoJson.mensaje = 'ÉXITO: Código verificado';
      }
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.mensaje = 'ERROR: Ocurrió un error inesperado. ' +
      'Intente más tarde.';
    return resultadoJson;
  });
}

export async function eliminarCodigoGuardado(email, codigoActual) {
  var seElimino = false;

  return Codigo.deleteOne({ Correo: email, Numero: codigoActual })
  .then(resultadoEliminacion => {
    if (resultadoEliminacion) {
      seElimino = true;
    }
    return seElimino;
    })
  .catch(error => {
    console.error(error);
    return seElimino;
  });
}