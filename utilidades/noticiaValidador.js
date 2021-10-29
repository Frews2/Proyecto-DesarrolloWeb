import { existeCuentaActiva } from "../controladores/cuentaControlador.js";
import { existeFigura } from "../controladores/figuraControlador.js";

const checkSchemaNoticia = {
  Texto: {
    isLength: {
      errorMessage:
        "El contenido de la noticia debe tener minimo de 10 caracteres y máximo 5000",
      options: { min: 10, max: 5000 },
    },
  },
  IdFugura: {
    custom: {
      options: async (value, { req }) => {
        return existeFigura(req.body.IdFigura, value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "La figura especificada de la noticia no se encuentra en nuestro sistema. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
  IdCuenta: {
    custom: {
      options: async (value) => {
        return existeCuentaActiva(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El creador especificado no se encuentra activo o no existe. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
};

export default checkSchemaNoticia;