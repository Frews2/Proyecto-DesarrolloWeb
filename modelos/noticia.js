import mongoose from 'mongoose';

const noticiaSchema = new mongoose.Schema({
    IdPublicacion: {
        type: String,
        required: true,
        unique: true,
    },
    Titulo: {
        type: String,
        required: true
    },
    IdFigura: {
        type: String,
        required: true
    },
    Texto: {
        type: String,
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

const Noticia = mongoose.model('noticias', noticiaSchema);
export default Noticia;