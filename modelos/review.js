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
        unique: true
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
        required: false
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