import { Guid } from "js-guid";;
import Noticia from "../modelos/noticia.js";
import { guardarImagen } from "../utilidades/servicioImagen.js";

export async function guardarNoticia(nuevaNoticia) {
    const CARPETA = "noticias";
    const { Foto } = nuevaNoticia;
    const GUID = Guid.newGuid();
    var rutaImagen = "";
    const nombreArchivo = GUID + nuevaNoticia.NombreFoto + nuevaNoticia.TipoFoto;
    const archivoSinExtension = GUID + nuevaNoticia.NombreFoto;
    Foto.name = nombreArchivo;

    var resultadoJSON = {
        exito: true,
        origen: "noticia/guardar",
        mensaje: "EXITO: Publicación guardada",
        resultado: null
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

    const noticia = {
        IdPublicacion: GUID,
        Titulo: nuevaNoticia.Titulo,
        IdCuenta: nuevaNoticia.IdCuenta,
        IdFigura: nuevaNoticia.IdFigura,
        Texto: nuevaNoticia.Texto,
        Foto: rutaImagen,
        NombreFoto: archivoSinExtension,
        TipoFoto: nuevaNoticia.TipoFoto,
        DescripcionFoto: nuevaNoticia.DescripcionFoto,
        Etiquetas: nuevaNoticia.Etiquetas
    }

    const noticiaAGuardar = new Noticia(noticia);

    return noticiaAGuardar.save()
    .then((seGuardo) => {
        console.log("NOTICIA GUARDADA: " + seGuardo);

        if(!seGuardo) {
            resultadoJSON.exito = false;
            resultadoJSON.mensaje = "Error: Ocurrió un error al intentar crear la noticia. Intenté de nuevo."
        } else {
            resultadoJSON.resultado = "Ruta de imagen es: " + seGuardo.Foto;
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

export async function eliminarNoticia(id) {
    return Noticia.deleteOne({IdPublicacion: id})
    .then(exito => {
        return exito.ok == 1;
    })
    .catch(error => {
        console.error(error);
    return false;
    })
}

export async function obtenerNoticiasReportadas() {
    const BANEADO = "BANEADO";
    var filtro = {};
    filtro.$or = [
        { Estatus: { $regex: BANEADO } }
    ];

    return await Noticia.find(filtro)
        .sort({ FechaRegistro: 'ascending' })
        .then((noticias) => {
            return noticias;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

export async function obtenerNoticias(texto) {
    var filtro = {};
    if (texto) {
        filtro.$or = [
            { Titulo: { $regex: texto, $options: "i" } },
            { Etiquetas: { $regex: texto, $options: "i" } },
        ];
        return Noticia.find(filtro)
        .sort({ FechaRegistro: 'descending'})
        .then((noticias) => {
            return noticias;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
    } else {
        return await Noticia.find();
    }
}
  
export async function obtenerNoticiaDatos(identificador) {
    return await Noticia.find({ IdPublicacion: identificador });
}