import mongoose from 'mongoose';

const comentarioSchema = new Schema({
    IdComentario: { 
        type: String,
        required: true,
        unique: true
    },
    Texto: { 
        type: String,
        required: true 
    },
    IdPublicacionOriginal: { 
        type: String,
        required: true,
        unique: true
    },
});

const Comentario = mongoose.model('comentarios', comentarioSchema);
export default Comentario;