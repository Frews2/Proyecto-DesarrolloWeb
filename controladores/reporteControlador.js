import { Guid } from "js-guid";
import Reporte from "../modelos/reporte.js";

export async function guardarReporte(nuevoReporte) {
    const GUID = Guid.newGuid();

    var resultadoJSON = {
        exito: true,
        origen: "reporte/guardar",
        mensaje: "EXITO: Reporte guardado",
        resultado: null
    };
    const reporte = {
        IdReporte: GUID,
        IdPublicacion: nuevoReporte.IdPublicacion,
        TipoPublicacion: nuevoReporte.TipoPublicacion,
        IdAcusador: nuevoReporte.IdAcusador,
        Razon: nuevoReporte.Razon,
        IdAcusado: nuevoReporte.IdAcusado
    }

    const reporteAGuardar = new Reporte(reporte);

    return reporteAGuardar.save()
    .then((seGuardo) => {
        console.log("REPORTE GUARDADO: " + seGuardo);

        if(!seGuardo) {
            resultadoJSON.exito = false;
            resultadoJSON.mensaje = "Error: Ocurrió un error al intentar registrar el reporte. Intenté de nuevo."
        } else {
            resultadoJSON.resultado = "Ruta de imagen es: " + seGuardo.Foto;
        }
        
        return resultadoJSON;
    })
    .catch(error => {
        console.error(error);
        resultadoJSON.exito = false;
        resultadoJSON.mensaje = "ERROR: Ocurrió un error al intentar crear el reporte. Intenté de nuevo.";
        return resultadoJSON;
    })
}

export async function eliminarReporte(id) {
    return Reporte.delete({IdPublicacion: id})
    .then(exito => {
        return exito.ok == 1;
    })
    .catch(error => {
        console.error(error);
    return false;
    })
}

export async function obtenerReportes() {

    return await Reporte.find()
        .sort({ FechaRegistro: 'ascending' })
        .then((reportes) => {
            return reportes;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}
  
export async function obtenerReporteDatos(identificador) {
    return await Reporte.find({ IdReporte: identificador });
}