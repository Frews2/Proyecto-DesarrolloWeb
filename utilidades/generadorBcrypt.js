import bcrypt from 'bcrypt';

const RONDAS_SALT = 10;

export function encriptar(texto) {
  var textoEncriptado = bcrypt.hashSync(texto, RONDAS_SALT);
  return textoEncriptado;
}