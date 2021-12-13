import { existeCuentaActiva } from '../controladores/cuentaControlador.js';
import { esNoticiaActiva } from '../controladores/noticiaControlador.js';
import { esReviewActivo } from '../controladores/reviewControlador.js';
import { esComentarioActivo } from '../controladores/comentarioControlador.js';

const MIN_RAZON = 10;
const MAX_RAZON = 500;

function esStringValido(texto) {
  texto = texto.replace(/\s/g,"");
  
  if (texto.lenth < MIN_RAZON || texto.length > MAX_RAZON) {
    throw new Error(`ERROR: La cadena de caracteres debe ser entre 
    ${MIN_RAZON} y ${MAX_RAZON} de largo.`);
  } else{
    return true;
  }
}

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
  const NOTICIA = await esNoticiaActiva(id);
  const REVIEW = await esReviewActivo(id);
  const COMENTARIO = await esComentarioActivo(id);
  
  if (!(NOTICIA || REVIEW || COMENTARIO)) {
    throw new Error('ERROR: ' +
      'No encontramos una publicación activa para reportarla. ' + 
      'Otro usuario pude haberla reportado.');
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
  IdCuenta: {
    custom: {
      options: async (value, { req }) => {
        return existeCuentaActiva(req.body.IdCuenta, value)
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
    custom: {
      options: (value) => {
        return esStringValido(value);
      },
    },
  },
};

export default checkSchemaReporte;