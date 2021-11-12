import mongoose from 'mongoose';

const figuraSchema = new mongoose.Schema({
    IdFigura: {
        type: String,
        required: true,
        unique: true,
    },
    Nombre: {
        type: String,
        required: true
    },
    Altura: {
        type: String,
        required: true
    },
    Material: {
        type: String,
        required: true
    },
    Marca: {
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
    }
});

const Figura = mongoose.model('figuras', figuraSchema);
export default Figura;