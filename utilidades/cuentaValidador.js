function esCorreoValido(email) {
  const PLANTILLA_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  var esValido = PLANTILLA_EMAIL.test(email);
  
  if (!esValido) {
    throw new Error(
    'ERROR: El correo recibido es invalido.'
    );
  } else{
    return true;
  }
}

function esTipoValido(tipo) {
  const PERIODISTA = 'Periodista';
  const COLECCIONISTA = 'Coleccionista';
  
  if (!(tipo == PERIODISTA || tipo == COLECCIONISTA)) {
    throw new Error(
    'ERROR: El tipo de cuenta es invalido.'
    );
  } else{
    return true;
  }
}

function esEstatusValido(estatus) {
  const ACTIVO = 'Activo';
  const PENDIENTE = 'Pendiente';
  const BANEADO = 'Baneado';

  if (!(estatus == ACTIVO || estatus == PENDIENTE || estatus == BANEADO)) {
  throw new Error(
    'ERROR: El estatus de cuenta es invalido.'
  )
  } else{
  return true;
  }
}

function esFechaValida(fecha) {
  const PLANTILLA_FECHA = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  var esValido = PLANTILLA_FECHA.test(fecha);

  if (!esValido) {
  throw new Error(
    'ERROR: La fecha recibida es invalida.'
  );
  } else{
  return true;
  }
}

function esSexoValido(sexo) {
  const FEMENINO = 'Femenino';
  const MASCULINO = 'Masculino';
  const OTRO = 'Otro';

  if (!(sexo === FEMENINO || sexo === MASCULINO || sexo === OTRO)) {
  throw new Error(
    'ERROR: El sexo es invalido.'
  );
  } else{
  return true;
  }
}
  
const esSchemaCuentaValido = {
  TipoCuenta: {
  custom: {
    options: (value) => {
    return esTipoValido(value);
    },
  },
  },
  Estatus: {
  custom: {
    options: (value) => {
    return esEstatusValido(value);
    },
  },
  },
  Email: {
  custom: {
    options: (value) => {
    return esCorreoValido(value);
    },
  },
  },
  Apodo: {
  isLength: {
    errorMessage: 'El apodo debe tener al menos tres caracteres.',
    options: { min: 3 },
  },
  },
  Password: {
  isLength: {
    errorMessage: 'La contraseña debe tener al menos 6 caracteres.',
    options: { min: 6 },
  },
  },
  Nombre: {
  isLength: {
    errorMessage: 'Los nombres debe tener al menos tres caracteres.',
    options: { min: 3 },
  },
  },
  Ocupacion: {
  isLength: {
    errorMessage: 'La ocupación debe tener al menos tres caracteres.',
    options: { min: 3 },
  },
  },
  FechaRegistro: {
  custom: {
    options: (value) => {
    return esFechaValida(value);
    },
  },
  },
  FechaNacimiento: {
  custom: {
    options: (value) => {
    return esFechaValida(value);
    },
  },
  },
  Pais: {
  isLength: {
    errorMessage: 'El país debe tener al menos tres caracteres.',
    options: { min: 3 },
  },
  },
  Sexo: {
  custom: {
    options: (value) => {
    return esSexoValido(value);
    },
  },
  },
};
  
export default esSchemaCuentaValido;