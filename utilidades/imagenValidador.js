export const MIN_NOMBRE = 5;
export const MAX_NOMBRE = 50;
export const MIN_DESCRIPCION = 10;
export const MAX_DESCRIPCION = 500;

export const ERROR_NOMBRE = 'ERROR: El nombre de la foto debe tener entre ' + 
  MIN_NOMBRE + ' y ' + MIN_NOMBRE + ' caracteres.';

export const ERROR_DESCRIPCION = 'ERROR: La descripción de la foto debe ' +
  'tener entre ' + MIN_DESCRIPCION + ' y ' + MAX_DESCRIPCION + ' caracteres.';

export async function esFormatoValido(formato) {
  const JPG = '.jpg';
  const JPEG = '.jpeg';
  const PNG = '.png';

  if (!(formato == JPG || formato == JPEG || formato == PNG)) {
    throw new Error('ERROR: El formato de la imagen es invalido.');
  } else{
    return true;
  }
}

export async function existeImagen(imagen) {
  if (imagen == null || imagen == undefined) {
    throw new Error('ERROR: No se tiene una Foto agregada a la publicacición.');
  } else{
    return true;
  }
}