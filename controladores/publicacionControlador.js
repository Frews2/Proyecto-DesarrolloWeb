import Publicacion from '../modelos/publicacion.js';

export async function guardarPublicacion(idCreador, idContenido) {

    var respuestaJSON = {
        exito: true,
        origen: "publicacion/guardar",
        mensaje: "EXITO: Publicación guardada",
        resultado: ""
    };

    const nuevaPublicacion = {
        IdPublicacion: idContenido,
        IdCuenta: idCreador
    }

    const publicacion = new Publicacion(nuevaPublicacion);

    return publicacion.save()
    .then((seGuardo) => {
        console.log(seGuardo);
        if(!seGuardo) {
            respuestaJSON.exito = false;
            respuestaJSON.mensaje = "ERROR: No pudimos guardar la publicación. Intenté de nuevo."
        }
        else {
            respuestaJSON.resultado = publicacion.IdPublicacion;
        }

        return respuestaJSON;
    })
    .catch(error => {
        console.error(error);
        respuestaJSON.exito = false;
        respuestaJSON.mensaje =
          "ERROR: No pudimos guardar la publicación. Intenté de nuevo.";
        return respuestaJSON;
    })
}

export async function eliminarPublicacion(idPublicacion) {
    return Publicacion.deleteOne({IdPublicacion: idPublicacion})
        .then(exito => {
            return exito.ok == 1;
        })
        .catch(error => {
            console.error(error);
        return false;
        })
}

export async function obtenerPublicaciones(busqueda) {
    const { IdContendio, IdAutor } = busqueda;

    if (IdContendio) {
          return await Publicacion.find({ IdPublicacion: IdContendio });
    } else {
        if (IdAutor) {
            return await Publicacion.find({IdCuenta: IdAutor});
        } else {
            return await Publicacion.find();
        }
    }
}