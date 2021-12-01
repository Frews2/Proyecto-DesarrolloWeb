import { existeColeccionistaActivo } from "../controladores/cuentaControlador.js";
import { existeFigura } from "../controladores/figuraControlador.js";
import { esFormatoValido, existeImagen } from "../utilidades/imagenValidador.js";

function esCalificacionValida(valor) {
  const MIN = 0;
  const MAX = 5;
  if (valor < MIN || valor > MAX ) {
    throw new Error(
      "ERROR: La calificacion debe ser un valor entre 0 y 5."
    );
  } else{
    return true;
  }
}

const checkSchemaReview = {
  Titulo: {
    isLength: {
      errorMessage:
        "El título de la crítica debe tener minimo de 3 caracteres y máximo 30",
      options: { min: 3, max: 30 },
    },
  },
  Texto: {
    isLength: {
      errorMessage:
        "El contenido de la crítica debe tener minimo de 10 caracteres y máximo 5000",
      options: { min: 10, max: 5000 },
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
        "La descripción de la foto de la crítica debe tener minimo de 10 caracteres y máximo 5000",
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
  IdFigura: {
    custom: {
      options: async (value, { req }) => {
        return existeFigura(req.body.IdFigura, value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "La figura especificada en la crítica no se encuentra en nuestro sistema. Por favor verifique la información."
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
        return existeColeccionistaActivo(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El creador especificado no se encuentra activo o no es Coleccionista. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
};

export default checkSchemaReview;