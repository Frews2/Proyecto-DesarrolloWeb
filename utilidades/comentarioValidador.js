import { existeCuentaActiva } from '../controladores/cuentaControlador.js';
import { esNoticiaActiva } from '../controladores/noticiaControlador.js';
import { esReviewActivo } from '../controladores/reviewControlador.js';

const MIN_COMENTARIO = 3;
const MAX_COMENTARIO = 250;

const checkSchemaComentario = {
  Texto: {
    Texto: Texto.replace(/\s/g,""),
    isLength: {
      errorMessage:
      'El texto del comentario debe tener un ' +
      'mínimo de 3 caracteres y máximo de 500.',
      options: { min: MIN_COMENTARIO, max: MAX_COMENTARIO },
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