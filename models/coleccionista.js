import mongoose from 'mongoose';

const coleccionistaSchema = new mongoose.Schema({
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Apodo: {
        type: String,
        required: true,
        validate: [validators.notEmpty, 'Nickname is empty']
    },
    FechaRegistro: {
        type: String,
        required: true,
    },
    FechaNacimiento: {
        type: String,
        required: true,
        validate: [validators.notEmpty, 'Birth date is empty']
    },
    Foto: {
        type: String,
        required: false
    },
    Pais: {
        type: String,
        required: true,
        validate: [validators.notEmpty, 'Country is empty']
    },
    Sexo: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino', 'Otro'],
        validate: [validators.notEmpty, 'Sex is empty']
    },
    Estatus: {
        type: String,
        required: true,
        enum: ['Activo', 'Baneado', 'Pendiente'],
    }
});

const Coleccionista = mongoose.model('Coleccionistas', coleccionistaSchema);
export default Coleccionista;