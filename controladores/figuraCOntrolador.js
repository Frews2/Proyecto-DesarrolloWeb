import { Guid } from "js-guid";
import Figura from "../modelos/figura.js";
import { guardarImagen } from "../utilidades/servicioImagen.js";

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
  const CARPETA = "figuras";
  const { Foto } = nuevaCritica;
  const GUID = Guid.newGuid();
  var rutaImagen = "";

  var resultadoJSON = {
    exito: true,
    origen: "figura/guardar",
    mensaje: "EXITO: Figura guardada",
  };

  const respuestaGuardado = await guardarImagen(Foto, CARPETA)
    .then((resultado) => {
      return resultado;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });

  if (!respuestaGuardado.exito) {
    resultadoJSON.exito = false;
    resultadoJSON.mensaje = respuestaGuardado.mensaje;
    return resultadoJSON;
  }
  
  rutaImagen = respuestaGuardado.rutaImagen;

  const figura = {
    IdFigura: GUID,
    Nombre: nuevaFigura.Nombre,
    Altura: nuevaFigura.Altura,
    Material: nuevaFigura.Material,
    Marca: nuevaFigura.Marca,
    Foto: rutaImagen,
    NombreFoto: nuevaFigura.NombreFoto,
    TipoFoto: nuevaFigura.TipoFoto,
    DescripcionFoto: nuevaFigura.DescripcionFoto,
  }

  const figuraAGuardar = new Figura(figura);

  return figuraAGuardar.save()
  .then((seGuardo) => {
      console.log("FIGURA GUARDADA: " + seGuardo);

      if(!seGuardo) {
          resultadoJSON.exito = false;
          resultadoJSON.mensaje = "Error: Ocurrió un error al intentar guardar la figura. Intenté de nuevo."
      }

      return resultadoJSON;
  })
  .catch(error => {
      console.error(error);
      resultadoJSON.exito = false;
      resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear la figura. Intenté de nuevo.";
      return resultadoJSON;
  })
}

export async function obtenerFiguras(busqueda) {
  const { NombreFigura} = busqueda;

  if (Nombre) {
    return await Figura.find({ Nombre: NombreFigura });
  } else {
    return await Figura.find();
  }
}