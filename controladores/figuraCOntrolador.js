import Figura from "../modelos/figura.js";

export async function existeFigura(idFigura) {
    return Figura.exists({ IdFigura: idFigura})
      .then((existe) => {
        return existe;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
}
export async function guardarFigura(nuevaFigura) {
  const { imagen } = nuevaFigura;

  var rutaImagen = "";

  var resultadoJSON = {
      exito: true,
      origen: "figura/guardar",
      mensaje: "EXITO: Figura guardada",
  };

  if (imagen) {
      const respuestaGuardado = await guardarImagen(imagen)
          .then((resultado) => {
              rutaImagen = respuestaGuardado.path;
              return resultado;
          })
          .catch((err) => {
              console.error(err);
              return err;
          });

      if(!respuestaGuardado.exito) {
          resultadoJSON.exito = respuestaGuardado.exito;
          resultadoJSON.mensaje = respuestaGuardado.mensaje;
          return resultadoJSON;
      } 
  }
  const GUID = Guid.newGuid();

  const figura = {
      IdFigura: GUID,
      Nombre: nuevaFigura.Nombre,
      Altura: nuevaFigura.Altura,
      Material: nuevaFigura.Material,
      Marca: nuevaFigura.Marca,
      Foto: rutaImagen
  }

  const figuraAGuardar = new Figura(figura);

  return figuraAGuardar.save()
  .then((seGuardo) => {
      console.log(seGuardo);

      if(!seGuardo) {
          resultadoJSON.exito = false;
          resultadoJSON.mensaje = "Error: Ocurrió un error al intentar guardar la figura. Intenté de nuevo."
      }

      return resultadoJSON;
  })
  .catch(error => {
      console.error(error);
      resultadoJSON.exito = false;
      resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear la noticia. Intenté de nuevo.";
      return resultadoJSON;
  })
}

export async function obtenerFiguras() {
  return Figura.find()
    .then((figuras) => {
      return figuras;
    })
    .catch((err) => {
      console.error(err);

      return [];
    })
}