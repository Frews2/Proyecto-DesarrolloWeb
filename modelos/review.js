import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    IdPublicacion: {
        type: String,
        required: true,
        unique: true
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
        required: true
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
    }
});

const Review = mongoose.model('reviews', reviewSchema);
export default Review;