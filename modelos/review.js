import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const reviewSchema = new Schema({
    IdPublicacion: {
        type: String,
        required: true,
        unique: true,
    },
    IdCuenta: {
        type: String,
        required: true,
    },
    IdFigura: {
        type: String,
        required: true,
    },
    Titulo: {
        type: String,
        required: true
    },
    Texto: {
        type: String,
        required: true
    },
    Calificacion: {
        type: Number,
        required: true,
        match: /^[0-9]+$/
    },
    Foto: {
        type: String,
        required: true
    },
    NombreFoto: {
        type: String,
        required: true
    },
    TipoFoto: {
        type: String,
        required: true
    },
    DescripcionFoto: {
        type: String,
        required: true
    },
    Etiquetas: {
        type: [String],
        default: [] 
    },
    Comentarios: {
        type: [String],
        default: []
    },
    FechaRegistro: {
        type: Date,
        required: true,
        default: Date.now
    },
    Estatus: {
        type: String,
        required: false,
        enum: ['Activo', 'Reportado'],
        default: 'Activo'
    }
});

const Review = model('reviews', reviewSchema);
export default Review;