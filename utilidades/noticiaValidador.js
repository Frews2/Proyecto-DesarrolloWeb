import { existePeriodistaActivo } from "../controladores/cuentaControlador.js";
import { existeFigura } from "../controladores/figuraControlador.js";

function esFormatoValido(formato) {
  const JPG = ".jpg";
  const JPEG = ".jpeg";
  const PNG = ".png";

  if (!(formato == JPG || formato == JPEG || formato == PNG)) {
    throw new Error(
      "ERROR: El formato de la imagen es invalido."
    );
  } else{
    return true;
  }
}

function tieneImagen(imagen) {
  
  if (imagen === null) {
    throw new Error(
      "ERROR: No se tiene una Foto agregada a la noticia."
    );
  } else{
    return true;
  }
}

const checkSchemaNoticia = {
  Titulo: {
    isLength: {
      errorMessage:
        "El nombre de la noticia debe tener minimo de 3 caracteres y máximo 30",
      options: { min: 3, max: 30 },
    },
  },
  Texto: {
    isLength: {
      errorMessage:
        "El contenido de la noticia debe tener minimo de 10 caracteres y máximo 5000",
      options: { min: 10, max: 5000 },
    },
  },
  Foto: {
    custom: {
      options: (value) => {
        return tieneImagen(value);
      },
    },
  },
  DescripcionFoto: {
    isLength: {
      errorMessage:
        "La descripción de la foto de la noticia debe tener minimo de 10 caracteres y máximo 5000",
      options: { min: 10, max: 5000 },
    },
  },
  TipoFoto: {
    custom: {
      options: (value) => {
        return esFormatoValido(value);
      },
    },
  },
  IdFigura: {
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
        return existePeriodistaActivo(value).then((existe) => {
          if (!existe) {
            return Promise.reject(
              "El creador especificado no se encuentra activo o no es Periodista. Por favor verifique la información."
            );
          }

          return existe;
        });
      },
    },
  },
};

export default checkSchemaNoticia;