import Codigo from '../modelos/codigo.js';
import mandarCodigoConfirmacion from '../utilidades/servicioEmail.js';

export async function enviarCorreo(email, tipoCuenta) {
  var resultadoJson = {
    exito: false,
    origen: 'codigo/EnviarCorreo',
    mensaje: 'EXITO: Correo mandado',
    resultado: null
  };

  return Codigo.find({ Correo: email })
  .then(codigoObtenido => {
    if(codigoObtenido){
      resultadoJson.exito = mandarCodigoConfirmacion(
        codigoObtenido.email, 
        tipoCuenta, 
        codigoObtenido.Numero)
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.exito =  false;
    resultadoJson.mensaje = 'ERROR: No se pudo mandar el correo ' +
    'en este momento.';
    return resultadoJson;
  })
}

export async function guardarCodigoConfirmacion(email, codigoActual) {
  var nuevoCodigo = new Codigo({
    Correo: email,
    Numero: codigoActual,
  });
  
  return nuevoCodigo.save()
  .then(codigoGuardado => {
    if(codigoGuardado){
      return true;
    }
  })
  .catch(error => {
    console.error(error);
    return false;
  })
}

export async function checarCodigoConfirmacion(email, codigoActual) {
  var resultadoJson = {
    esCorrecto: true,
    mensaje: 'EXITO: Código de confirmación de cuenta correcto.',
  };

  return Codigo.findOne({Correo: email})
  .then(codigo => {
    if (!codigo) {
      resultadoJson.esCorrecto = false;
      resultadoJson.mensaje = 'Autentificación fallida. ' +
      'Verifique que ingresaste el email correspondiente ' +
      'y el código de confirmación no ha expirado.';
    }
    else {
      if (codigo.Numero != codigoActual) {
        resultadoJson.esCorrecto = false;
        resultadoJson.mensaje = 'El código de confirmación ' +
        'de cuenta es incorrecto.';
      }
    }
    return resultadoJson;
  })
  .catch(error => {
    console.error(error);
    resultadoJson.esCorrecto = false;
    resultadoJson.mensaje = error;
    return resultadoJson;
  })
}

export async function eliminarCodigoGuardado(email, codigoActual) {
  var seElimino = false;

  return Codigo.deleteOne({ Correo: email, Numero: codigoActual })
  .then((resultadoEliminacion) => {
    if(resultadoEliminacion){
      seElimino = true;
    }
    return seElimino;
  })
  .catch((error) => {
    console.error(error);
    return seElimino;
  });
}