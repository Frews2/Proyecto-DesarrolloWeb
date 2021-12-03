import { existeCuentaActivaPorEmail } from "../controladores/cuentaControlador.js";
import { noEsNoticiaBaneada } from "../controladores/noticiaControlador.js";
import { noEsReviewBaneado } from "../controladores/reviewControlador.js";


const checkSchemaFigura = {
    Texto: {
    isLength: {
      errorMessage:
        "El texto del comentario debe tener un mínimo de 3 caracteres y máximo de 500.",
      options: { min: 3, max: 500 },
    },
  },
  IdPublicacionOriginal: {
    custom: {
      options: async (value, { req }) => {
        return noEsNoticiaBaneada(req.body.IdPublicacionOriginal, value).then((existe) => {
          if (!existe) {
            return noEsReviewBaneado(req.body.IdPublicacionOriginal, value).then((existe) => {
                if (!existe) {
                  return Promise.reject(
                    "No se encuentra una publicación no baneada para agregar el comentario, solo se puede comentar en una publicación activa."
                  );
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
        return existeCuentaActivaPorEmail(req.body.Email, value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "La cuenta creadora del comentario no esta activada. Solo cuentas activas pueden comentar."
            );
          }

          return existe;
        });
      },
    },
  },
};

export default checkSchemaFigura;