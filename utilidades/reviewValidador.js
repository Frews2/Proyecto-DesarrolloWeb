import { 
  existeColeccionistaActivo } from '../controladores/cuentaControlador.js';
import { existeFigura } from '../controladores/figuraControlador.js';
import { MIN_NOMBRE, MAX_NOMBRE, MIN_DESCRIPCION, MAX_DESCRIPCION,
  esFormatoValido, existeImagen } from '../utilidades/imagenValidador.js';

const MIN_TITULO = 3;
const MAX_TITULO = 50;
const MIN_TEXTO = 10;
const MAX_TEXTO = 1000;

function esStringValido(texto, min, max) {
  texto = texto.replace(/\s/g,"");
  
  if (texto.lenth < min || texto.length > max) {
    throw new Error(`ERROR: La cadena de caracteres debe ser entre 
    ${min} y ${max} de largo.`);
  } else{
    return true;
  }
}

function esCalificacionValida(valor) {
  const MIN = 0;
  const MAX = 5;
  if (valor < MIN || valor > MAX ) {
  throw new Error(
    'ERROR: La calificacion debe ser un valor entre 0 y 5.'
  );
  } else{
  return true;
  }
}

const checkSchemaReview = {
  Titulo: {
    custom: {
      options: (value) => {
        return esStringValido(value, MIN_TITULO, MAX_TITULO);
      },
    },
  },
  Texto: {
    custom: {
      options: (value) => {
        return esStringValido(value, MIN_TEXTO, MAX_TEXTO);
      },
    },
  },
  Calificacion: {
    custom: {
      options: (value) => {
        return esCalificacionValida(value);
      },
    },
  },
  Foto: {
    custom: {
      options: async (value, { req }) => {
        return existeImagen(req.body.Foto, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('No existe una foto, ' +
              'por favor agregue una foto.');
          }
          return existe;
        });
      },
    },
  },
  NombreFoto: {
    custom: {
      options: (value) => {
        return esStringValido(value, MIN_NOMBRE, MAX_NOMBRE);
      },
    },
  },
  DescripcionFoto: {
    custom: {
      options: (value) => {
        return esStringValido(value, MIN_DESCRIPCION, MAX_DESCRIPCION);
      },
    },
  },
  TipoFoto: {
    custom: {
      options: async (value, { req }) => {
        return esFormatoValido(req.body.TipoFoto, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('El tipo de foto no es valido. ' +
              'Por favor verifique que la foto tenga extensión correcta.');
          }
          return existe;
        });
      },
    },
  },
  IdFigura: {
    custom: {
      options: async (value, { req }) => {
        return existeFigura(req.body.IdFigura, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('La figura especificada de ' + 
              'la crítica no se encuentra en nuestro sistema. ' +
              'Por favor verifique la información.');
          }
          return existe;
        });
      },
    },
  },
  IdCuenta: {
    custom: {
      options: async (value) => {
        return existeColeccionistaActivo(value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('El creador especificado no se ' +
              'encuentra activo o no es Coleccionista. ' +
              'Por favor verifique la información.');
          }
          return existe;
        });
      },
    },
  },
};

export default checkSchemaReview;