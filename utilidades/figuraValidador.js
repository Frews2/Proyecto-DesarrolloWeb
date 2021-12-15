/*
 Fecha: 05/10/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import { MIN_NOMBRE, MAX_NOMBRE, MIN_DESCRIPCION, MAX_DESCRIPCION,
  esFormatoValido, existeImagen } from '../utilidades/imagenValidador.js';
  
const MIN_ALTURA = 1;
const MIN_FIGURA = 3;
const MAX_FIGURA = 30;

function esStringValido(texto, min, max) 
{
  texto = texto.replace(/\s/g,"");
  
  if (texto.lenth < min || texto.length > max) 
  {
    throw new Error(`ERROR: La cadena de caracteres debe ser entre 
    ${min} y ${max} de largo.`);
  } else{
    return true;
  }
}

const checkSchemaFigura = 
{
  Nombre: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value, MIN_NOMBRE, MAX_NOMBRE);
      },
    },
  },
  Altura: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value, MIN_ALTURA, MIN_FIGURA);
      },
    },
  },
  Material: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value, MIN_FIGURA, MAX_FIGURA);
      },
    },
  },
  Marca: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value, MIN_ALTURA, MAX_FIGURA);
      },
    },
  },
  Foto: 
  {
    custom: 
    {
      options: async (value, { req }) =>
      {
        return existeImagen(req.files.Foto, value)
        .then((existe) => 
        {
          if (!existe) 
          {
            return Promise.reject('No existe una foto, ' +
              'por favor agregue una foto.');
          }
          return existe;
        });
      },
    },
  },
  NombreFoto: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value, MIN_NOMBRE, MAX_NOMBRE);
      },
    },
  },
  DescripcionFoto: 
  {
    custom: 
    {
      options: (value) => 
      {
        return esStringValido(value, MIN_DESCRIPCION, MAX_DESCRIPCION);
      },
    },
  },
  TipoFoto: 
  {
    custom: 
    {
      options: async (value, { req }) => 
      {
        return esFormatoValido(req.body.TipoFoto, value)
        .then((existe) => {

          if (!existe) 
          {
            return Promise.reject('El tipo de foto no es valido. ' +
              'Por favor verifique que la foto tenga extensión correcta.');
          }
          return existe;
        });
      },
    },
  },
};

export default checkSchemaFigura;