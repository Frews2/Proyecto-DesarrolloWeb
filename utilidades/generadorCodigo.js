/*
 Fecha: 20/09/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import { MIN_CODIGO, MAX_CODIGO } from '../utilidades/constantes.js';

export default function generarCodigoAzar() 
{
  var codigo = 
    Math.floor(Math.random() * (MAX_CODIGO - MIN_CODIGO + 1)) + MIN_CODIGO;
  return codigo;
}