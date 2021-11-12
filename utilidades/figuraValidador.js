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
      "ERROR: No se tiene una Foto agregada a la crítica."
    );
  } else{
    return true;
  }
}

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
        "El texto de altura de la figura debe tener minimo de 3 caracteres y máximo 25",
      options: { min: 3, max: 25 },
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
      options: (value) => {
        return tieneImagen(value);
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
      options: (value) => {
        return esFormatoValido(value);
      },
    },
  },
};

export default checkSchemaFigura;