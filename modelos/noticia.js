import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const noticiaSchema = new Schema({
    IdPublicacion: {
        type: String,
        required: true,
        unique: true,
    },
    IdCuenta: {
        type: String,
        required: true,
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

const Noticia = model('noticias', noticiaSchema);
export default Noticia;