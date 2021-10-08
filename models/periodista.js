import mongoose from 'mongoose';

const periodistaSchema = new mongoose.Schema({
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Nombre: {
        type: String,
        required: true,
        validate: [validators.notEmpty, 'Name is empty']
    },
    Ocupacion: {
        type: String,
        required: true,
        validate: [validators.notEmpty, 'Ocupation is empty']
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
    }
});

const Periodista = mongoose.model('Periodistas', periodistaSchema);
export default Periodista;