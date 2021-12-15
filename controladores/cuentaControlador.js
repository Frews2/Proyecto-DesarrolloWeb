/*
 Fecha: 15/09/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import { Guid } from 'js-guid';
import Cuenta from '../modelos/cuenta.js';
import { 
  guardarCodigoConfirmacion } from '../controladores/codigoControlador.js';
import mandarCodigoConfirmacion from '../utilidades/servicioEmail.js';
import generarCodigoAzar from '../utilidades/generadorCodigo.js';
import { encriptar } from '../utilidades/generadorBcrypt.js';
import { REPORTADO, ACTIVO, PENDIENTE,
  PERIODISTA, COLECCIONISTA } from '../utilidades/constantes.js';

export function existeCuenta(email) 
{
  return Cuenta.exists({ Email: email })
  .then((existe) => 
  {
    return existe;
  })
  .catch((error) => 
  {
    console.error('ERROR: ' + error);
    return false;
  });
}

export async function existeCuentaActiva(idCuenta) 
{
  return Cuenta.exists({ IdCuenta: idCuenta, Estatus: ACTIVO})
  .then((existe) => 
  {
    return existe;
  })
  .catch((err) => 
  {
    console.error(err);
    return false;
  });
}

export async function existePeriodistaActivo(idCuenta) 
{
  return Cuenta.exists(
  { 
    IdCuenta: idCuenta,
    TipoCuenta: PERIODISTA,
    Estatus: ACTIVO})
  .then((existe) => 
  {
    return existe;
  })
  .catch((err) => 
  {
    console.error(err);
    return false;
  });
}

export async function existeColeccionistaActivo(idCuenta) 
{
  return Cuenta.exists(
  { 
    IdCuenta: idCuenta,
    TipoCuenta: COLECCIONISTA,
    Estatus: ACTIVO})
  .then((existe) => 
  {
    return existe;
  })
  .catch((err) => 
  {
    console.error(err);
    return false;
  });
}

export async function guardarCuenta(usuario) 
{
  const GUID = Guid.newGuid();
  var passwordEncriptado = encriptar(usuario.Password);

  var resultadoJson = 
  {
    exito: false,
    origen: 'cuenta/Registrar',
    mensaje: 'ERROR: No pudimos registrar su cuenta. Intenté de nuevo.',
  };

  usuario.IdCuenta = GUID;
  usuario.Password = passwordEncriptado;
  usuario.Estatus = PENDIENTE;

  var nuevaCuenta = new Cuenta(usuario);

  return nuevaCuenta.save()
  .then((cuentaGuardada) => 
  {
    if (cuentaGuardada) 
    {
      const { Email } = cuentaGuardada;
      var numeroConfirmacion = generarCodigoAzar();

      return guardarCodigoConfirmacion(Email, numeroConfirmacion)
      .then((creado) => 
      {
        if (creado) 
        {
          return mandarCodigoConfirmacion(Email,numeroConfirmacion)
          .then((mandado) => 
          {
            if (mandado) 
            {
              resultadoJson.exito = true;
              resultadoJson.mensaje = 'ÉXITO: Cuenta creada y correo mandado';
            } else
            {
              resultadoJson.mensaje = 'ERROR: No se envió el correo con código' +
              '. Intente de nuevo.';
            }
            return resultadoJson;
          })
          .catch((error) => 
          {
            console.error('ERROR: ' + error);
            resultadoJson.mensaje = 'ERROR: Ocurrió un error inesperado  y no' +
              'pudimos generar un código de confirmación. Intente de nuevo.';
              resultadoJson.resultado = error;
            return resultadoJson;
          });
        } else
        {
          resultadoJson.mensaje = 'ERROR: No pudimos crear un código ' +
            'de verificación. Intente de nuevo';
          return resultadoJson;
        }
      })
      .catch((error) => 
      {
        console.error('ERRROR: ' + error);
        resultadoJson.mensaje = 'ERROR: ' +
        'Ocurrió un error inesperado al intentar registrar la cuenta. ' +
        'Intenté de nuevo.';
        resultadoJson.resultado = error;
        return resultadoJson;
      });
    }
    return resultadoJson;
  })
  .catch((error) => 
  {
    console.error('ERRROR: ' + error);
    resultadoJson.mensaje = 'ERROR: ' +
      'Ocurrió un error inesperado al intentar registrar la cuenta. ' +
      'Intenté de nuevo.';
      resultadoJson.resultado = error;
    return resultadoJson;
  });
}

export async function activarCuenta(correo) 
{
  const CUENTA_ACTIVA = 
  {
    Estatus: ACTIVO
  };
  
  var seActivo = false;
  
  return Cuenta.updateOne({Email: correo}, CUENTA_ACTIVA)
  .then(resultadoActivacion => 
    {
    if(resultadoActivacion)
    {
      seActivo = true;
    }
    return seActivo;
  })
  .catch(error => 
  {
  console.error(error);
    return seActivo;
  });
}

export async function reportarCuenta(idCuenta) 
{
  var seReporto = false;
  
  if(Cuenta.exists({IdCuenta: idCuenta}))
  {
    return Cuenta.updateOne(
      {IdCuenta: idCuenta},
      {Estatus: REPORTADO}
    )
    .then(seActualizo => 
    {
      if(seActualizo)
      {
        seReporto = true;
      }
      return seReporto;
    })
    .catch(error => 
    {
      console.error(error);
      return seReporto;
    });
  }
  return seReporto;
}