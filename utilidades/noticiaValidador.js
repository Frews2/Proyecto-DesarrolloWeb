import { existePeriodistaActivo } from '../controladores/cuentaControlador.js';
import { existeFigura } from '../controladores/figuraControlador.js';
import { MIN_NOMBRE, MAX_NOMBRE, MIN_DESCRIPCION,
  MAX_DESCRIPCION, ERROR_NOMBRE, ERROR_DESCRIPCION,
  esFormatoValido, existeImagen } from '../utilidades/imagenValidador.js';

const MIN_TITULO = 3;
const MAX_TITULO = 50;
const ERROR_TITULO = 'ERROR: El campo debe tener entre ' + MIN_TITULO + 
  ' y ' + MAX_TITULO + ' caracteres.';
  
const MIN_TEXTO = 4;
const MAX_TEXTO = 500;
const ERROR_TEXTO = 'ERROR: El campo debe tener entre ' + MIN_TEXTO + 
  ' y ' + MAX_TEXTO + ' caracteres.';

const checkSchemaNoticia = {
  Titulo: {
    isLength: {
      errorMessage: ERROR_TITULO,
      options: { min: MIN_TITULO, max: MAX_TITULO },
    },
  },
  Texto: {
    isLength: {
      errorMessage: ERROR_TEXTO,
      options: { min: MIN_TEXTO, max: MAX_TEXTO },
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
  IdFigura: {
    custom: {
      options: async (value, { req }) => {
        return existeFigura(req.body.IdFigura, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('La figura especificada de ' + 
              'la noticia no se encuentra en nuestro sistema. ' +
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
        return existePeriodistaActivo(value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('El creador especificado no se ' +
              'encuentra activo o no es Periodista. ' + 
              'Por favor verifique la información.');
          }
          return existe;
        });
      },
    },
  },
};

export default checkSchemaNoticia;