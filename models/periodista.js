import mongoose from 'mongoose';

const periodistaSchema = new mongoose.Schema({
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Nombre: {
        type: String,
        required: true
    },
    Ocupacion: {
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
    }
});

const Periodista = mongoose.model('Periodistas', periodistaSchema);
export default Periodista;