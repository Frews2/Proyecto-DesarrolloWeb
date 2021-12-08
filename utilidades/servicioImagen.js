import fs from 'fs';

const carpeta = process.cwd() + '/recursos';

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
};

export async function guardarImagen(nuevaImagen, tipoCarpeta) {
  const { name, data } = nuevaImagen;
  const rutaImagen = `${carpeta}/${tipoCarpeta}/${name}`;

  var resultadoJson = {
    exito: false,
    rutaImagen: ''
  };

  return guardarArchivo(rutaImagen, data).then(seGuardo => {
    if (seGuardo) {
      resultadoJson.exito = seGuardo;
      resultadoJson.rutaImagen = rutaImagen;
    }
    return resultadoJson;
  }).catch(error => {
    console.log('ERROR: No se pudo guardar la imagen. ' + error);
    return resultadoJson;
  });
}