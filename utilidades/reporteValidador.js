import { existeCuentaActiva,
  existeCuenta } from '../controladores/cuentaControlador.js';
import { esNoticiaActiva } from '../controladores/noticiaControlador.js';
import { esReviewActivo } from '../controladores/reviewControlador.js';
import { esComentarioActivo } from '../controladores/comentarioControlador.js';

const MIN_RAZON = 10;
const MAX_RAZON = 500;
const ERROR_RAZON = 'ERROR: El campo debe tener entre ' + MIN_RAZON + 
  ' y ' + MAX_RAZON + ' caracteres.';

async function esTipoValido(tipo) {
  const NOTICIA = 'Noticia';
  const REVIEW = 'Review';
  const COMENTARIO = 'Comentario';
  
  if (!(tipo == NOTICIA || tipo == REVIEW || tipo == COMENTARIO)) {
    throw new Error('ERROR: El tipo del reporte es invalido.');
  } else{
    return true;
  }
}

async function esPublicacionActiva(id) {
  const NOTICIA = esNoticiaActiva(id);
  const REVIEW = esReviewActivo(id);
  const COMENTARIO = esComentarioActivo(id);
  
  if (!(NOTICIA || REVIEW || COMENTARIO)) {
    throw new Error('ERROR: ' +
      'La publicacion ya se encuentra reportada.');
  } else{
    return true;
  }
}

const checkSchemaReporte = {
  IdPublicacion: {
    custom: {
      options: async (value, { req }) => {
        return esPublicacionActiva(req.body.IdPublicacion, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('Ya se encuentra reportada la Publicación.');
          }
          return existe;
        });
      },
    },
  },
  TipoPublicacion: {
    custom: {
      options: async (value, { req }) => {
        return esTipoValido(req.body.TipoPublicacion, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('El tipo de publicación es invalida. ' +
              'Por favor verifique que el tipo sea ' +
              'Noticia, Review o Comentario.');
          }
          return existe;
        });
      },
    },
  },
  IdAcusador: {
    custom: {
      options: async (value, { req }) => {
        return existeCuentaActiva(req.body.IdAcusador, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('La cuenta del acusador, ' +
              'creador del reporte, no esta activa. ' +
              'Solo cuentas activas pueden reportar.');
          }
          return existe;
        });
      },
    },
  },
  Razon: {
    isLength: {
      errorMessage: ERROR_RAZON,
      options: { min: MIN_RAZON, max: MAX_RAZON },
    },
  },
  IdAcusado: {
    custom: {
      options: async (value, { req }) => {
        return existeCuenta(req.body.IdAcusado, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject('La cuenta del acusado no se encuentra ' +
              'en el sistema. Verifique la cuenta de acusado.');
          }
          return existe;
        });
      },
    },
  },
};

export default checkSchemaReporte;