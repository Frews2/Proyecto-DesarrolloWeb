import mongoose from 'mongoose';

const coleccionistaSchema = new mongoose.Schema({
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Apodo: {
        type: String,
        required: true
    },
    FechaRegistro: {
        type: String,
        required: true,
    },
    FechaNacimiento: {
        type: String,
        required: true
    },
    Foto: {
        type: String,
        required: false
    },
    Pais: {
        type: String,
        required: true
    },
    Sexo: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino', 'Otro']
    },
    Estatus: {
        type: String,
        required: true,
        enum: ['Activo', 'Baneado', 'Pendiente'],
    }
});

const Coleccionista = mongoose.model('Coleccionistas', coleccionistaSchema);
export default Coleccionista;