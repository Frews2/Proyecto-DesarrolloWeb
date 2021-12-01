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
    IdCuenta: { 
        type: String,
        required: true,
        unique: true
    },
    FechaRegistro: {
        type: Date,
        required: true,
        default: Date.now
    },
    Estatus: {
        type: String,
        required: false,
        enum: ["Activo", "Baneado", "Reportado"],
        default: "Activo"
    }
});

const Comentario = mongoose.model('comentarios', comentarioSchema);
export default Comentario;