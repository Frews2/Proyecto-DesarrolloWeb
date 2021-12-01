import { esFormatoValido, existeImagen } from "../utilidades/imagenValidador.js";

const checkSchemaFigura = {
  Nombre: {
    isLength: {
      errorMessage:
        "El nombre de la figura debe tener minimo de 3 caracteres y máximo 30",
      options: { min: 3, max: 30 },
    },
  },
  Altura: {
    isLength: {
      errorMessage:
        "El texto de altura de la figura debe tener entre 1 y 3 caracteres",
      options: { min: 1, max: 3 },
    },
  },
  Material: {
    isLength: {
      errorMessage:
        "El material de la figura debe tener minimo de 3 caracteres y máximo 25",
      options: { min: 3, max: 25 },
    },
  },
  Marca: {
    isLength: {
      errorMessage:
        "La marca de la figura debe tener minimo de 2 caracteres y máximo 50",
      options: { min: 2, max: 50 },
    },
  },
  Foto: {
    custom: {
      options: async (value, { req }) => {
        return existeImagen(req.body.Foto, value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "No existe una foto, por favor agregue una foto."
            );
          }

          return existe;
        });
      },
    },
  },
  NombreFoto: {
    isLength: {
      errorMessage:
        "El nombre de la imagen de la noticia debe tener minimo de 5 caracteres y máximo 50",
      options: { min: 5, max: 50 },
    },
  },
  DescripcionFoto: {
    isLength: {
      errorMessage:
        "La descripción de la foto de la figura debe tener minimo de 10 caracteres y máximo 5000",
      options: { min: 10, max: 5000 },
    },
  },
  TipoFoto: {
    custom: {
      options: async (value, { req }) => {
        return esFormatoValido(req.body.TipoFoto, value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El tipo de foto no es valido. Por favor verifique que la foto tenga extensión correcta."
            );
          }

          return existe;
        });
      },
    },
  },
};

export default checkSchemaFigura;