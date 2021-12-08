import { MIN_NOMBRE, MAX_NOMBRE, MIN_DESCRIPCION,
  MAX_DESCRIPCION, ERROR_NOMBRE, ERROR_DESCRIPCION,
  esFormatoValido, existeImagen } from '../utilidades/imagenValidador.js';
  
const MIN_ALTURA = 1;
const MIN_FIGURA = 3;
const MAX_FIGURA = 30;
const MENSAJE_ERROR = 'ERROR: El campo debe tener entre ' + MIN_FIGURA + 
  ' y ' + MAX_FIGURA + ' caracteres.';

const checkSchemaFigura = {
  Nombre: {
    isLength: {
      errorMessage: MENSAJE_ERROR,
      options: { min: MIN_FIGURA, max: MAX_FIGURA },
    },
  },
  Altura: {
    isLength: {
      errorMessage: 'ERROR: El campo debe tener entre ' + MIN_ALTURA + 
        ' y ' + MIN_FIGURA + ' caracteres.',
      options: { min: MIN_ALTURA, max: MIN_FIGURA },
    },
  },
  Material: {
    isLength: {
      errorMessage: MENSAJE_ERROR,
      options: { min: MIN_FIGURA, max: MAX_FIGURA },
    },
  },
  Marca: {
    isLength: {
      errorMessage: 'ERROR: El campo debe tener entre ' + MIN_ALTURA + 
        ' y ' + MAX_FIGURA + ' caracteres.',
      options: { min: MIN_ALTURA, max: MAX_FIGURA },
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
    isLength: {
      errorMessage: ERROR_NOMBRE,
      options: { min: MIN_NOMBRE, max: MAX_NOMBRE },
    },
  },
  DescripcionFoto: {
    isLength: {
      errorMessage: ERROR_DESCRIPCION,
      options: { min: MIN_DESCRIPCION, max: MAX_DESCRIPCION },
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
};

export default checkSchemaFigura;