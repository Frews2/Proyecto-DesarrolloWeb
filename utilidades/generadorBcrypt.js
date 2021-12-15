/*
 Fecha: 20/09/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import bcrypt from 'bcrypt';
import { RONDAS_SALT } from '../utilidades/constantes.js';

export function encriptar(texto) 
{
  var textoEncriptado = bcrypt.hashSync(texto, RONDAS_SALT);
  return textoEncriptado;
}