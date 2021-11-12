import fs from 'fs';
import { Guid } from "js-guid";

const carpeta = process.cwd() + "/recursos";

if (!fs.existsSync(carpeta)) {
    fs.mkdir(carpeta, null, function (err) {
      if (err) {
        console.error(err);
      }
    });
}

const guardarArchivo = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      if (err) {
        console.error(err);
        reject(false);
      }

      resolve(true);
    });
  });
}

export async function guardarImagenNoticia(nuevaImagen) {
    const { name, data } = nuevaImagen;
    const GUID = Guid.newGuid();
    const rutaImagen = `${carpeta}/noticias/${GUID}${name}`;

    var respuestaJSON = {
      exito: false,
      rutaImagen: ""
    }

    return guardarArchivo(rutaImagen, data).then(seGuardo => {
      if (seGuardo) {
        respuestaJSON.exito = seGuardo;
        respuestaJSON.rutaImagen = rutaImagen;
      }

      return respuestaJSON;
    }).catch(error => {
      console.log(error);
    
      return respuestaJSON;
    });
}