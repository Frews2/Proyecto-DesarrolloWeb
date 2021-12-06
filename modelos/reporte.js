import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const reporteSchema = new Schema({
    IdReporte: {
        type: String,
        required: true,
        unique: true,
    },
    IdPublicacion: {
        type: String,
        required: true,
        unique: true,
    },
    TipoPublicacion: {
        type: String,
        required: true,
        enum: ['Noticia', 'Review', 'Comentario']
    },
    IdAcusador: {
        type: String,
        required: true
    },
    Razon: {
        type: String,
        required: true
    },
    IdAcusado: {
        type: String,
        required: true
    },
    FechaRegistro: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const Reporte = model('reportes', reporteSchema);
export default Reporte;