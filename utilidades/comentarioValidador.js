import { existeCuentaActiva } from '../controladores/cuentaControlador.js';
import { esNoticiaActiva } from '../controladores/noticiaControlador.js';
import { esReviewActivo } from '../controladores/reviewControlador.js';

const MIN_COMENTARIO = 3;
const MAX_COMENTARIO = 250;

function esStringValido(texto) {
  texto = texto.replace(/\s/g,"");
  
  if (texto.lenth < MIN_COMENTARIO || texto.length > MAX_COMENTARIO) {
    throw new Error(`ERROR: La cadena de caracteres debe ser entre 
    ${MIN_COMENTARIO} y ${MAX_COMENTARIO} de largo.`);
  } else{
    return true;
  }
}

const checkSchemaComentario = {
  Texto: {
    custom: {
      options: (value) => {
        return esStringValido(value);
      },
    },
  },
  IdPublicacionOriginal: {
    custom: {
      options: async (value, { req }) => {
        return esNoticiaActiva(req.body.IdPublicacionOriginal, value)
        .then((existe) => {
          if (!existe) {
            return esReviewActivo(req.body.IdPublicacionOriginal, value)
            .then((existe) => {
              if (!existe) {
                return Promise.reject(
                  'No se encuentra una publicación activa. Debe tener una ' +
                  'publicación activa para agregar un comentario.');
              }
              return existe;
            });
          }
          return existe;
        });
      },
    },
  },
  Email: {
    custom: {
      options: async (value, { req }) => {
        return existeCuentaActiva(req.body.IdCuenta, value)
        .then((existe) => {
          if (!existe) {
            return Promise.reject(
              'La cuenta creadora del comentario no esta activada. ' +
              'Solo cuentas activas pueden comentar.');
          }
          return existe;
        });
      },
    },
  },
};

export default checkSchemaComentario;