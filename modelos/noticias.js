import mongoose from 'mongoose';

const noticiaSchema = new mongoose.Schema({
    IdPublicacion: {
        type: String,
        required: true,
        unique: true,
    },
    IdFigura: {
        type: String,
        required: true,
        unique: true,
    },
    Texto: {
        type: String,
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

const Noticia = mongoose.model('noticias', noticiaSchema);
export default Noticia;