/*
 Fecha: 20/09/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import { PERIODISTA, COLECCIONISTA } from '../utilidades/constantes.js';

const MIN_CUENTA = 4;
const MAX_CUENTA = 50;

function esStringValido(texto) 
{
  texto = texto.replace(/\s/g,"");
  
  if (texto.lenth < MIN_CUENTA || texto.length > MAX_CUENTA) 
  {
    throw new Error(`ERROR: La cadena de caracteres debe ser entre 
    ${MIN_CUENTA} y ${MAX_CUENTA} de largo.`);
  } else
  {
    return true;
  }
}

function esCorreoValido(email) 
{
  const PLANTILLA_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var esValido = PLANTILLA_EMAIL.test(email);
  
  if (!esValido) 
  {
    throw new Error('ERROR: El correo recibido es invalido.');
  } else
  {
    return true;
  }
}

function esTipoValido(tipo) 
{
  if (!(tipo == PERIODISTA || tipo == COLECCIONISTA)) 
  {
    throw new Error(
    'ERROR: El tipo de cuenta es invalido.'
    );
  } else
  {
    return true;
  }
}

function esFechaValida(fecha) 
{
  const PLANTILLA_FECHA = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  var esValido = PLANTILLA_FECHA.test(fecha);

  if (!esValido) 
  {
  throw new Error(
    'ERROR: La fecha recibida es invalida.'
  );
  } else
  {
  return true;
  }
}

function esSexoValido(sexo) 
{
  const FEMENINO = 'Femenino';
  const MASCULINO = 'Masculino';
  const OTRO = 'Otro';

  if (!(sexo === FEMENINO || sexo === MASCULINO || sexo === OTRO))
  {
    throw new Error('ERROR: El sexo es invalido.');
  } else
  {
    return true;
  }
}
  
const esSchemaCuentaValido = 
{
  TipoCuenta: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esTipoValido(value);
      },
    },
  },
  Email: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esCorreoValido(value);
      },
    },
  },
  Apodo: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value);
      },
    },
  },
  Password: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value);
      },
    },
  },
  Nombre: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value);
      },
    },
  },
  Ocupacion: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value);
      },
    },
  },
  FechaNacimiento: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esFechaValida(value);
      },
    },
  },
  Pais: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value);
      },
    },
  },
  Sexo: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esSexoValido(value);
      },
    },
  },
};
  
export default esSchemaCuentaValido;