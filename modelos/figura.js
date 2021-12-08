import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const figuraSchema = new Schema({
    IdFigura: {
        type: String,
        required: true,
        unique: true,
    },
    Nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Altura: {
        type: String,
        required: true,
        match: /^[0-9]+$/,
        trim: true
    },
    Material: {
        type: String,
        required: true,
        trim: true
    },
    Marca: {
        type: String,
        required: true,
        trim: true
    },
    Foto: {
        type: String,
        required: true,
        trim: true
    },
    NombreFoto: {
        type: String,
        required: true,
        trim: true
    },
    TipoFoto: {
        type: String,
        required: true,
        trim: true
    },
    DescripcionFoto: {
        type: String,
        required: true,
        trim: true
    }
});

const Figura = model('figuras', figuraSchema);
export default Figura;