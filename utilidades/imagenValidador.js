export function esFormatoValido(formato) {
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

export function existeImagen(imagen) {
  
  if (imagen === null) {
    "ERROR: No se tiene una Foto agregada a la publicacición."
    throw new Error(
    );
  } else{
    return true;
  }
}