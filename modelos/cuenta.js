import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const cuentaSchema = new Schema({
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    TipoCuenta: {
        type: String,
        required: true,
        enum: ['Periodista', 'Coleccionista']
    },
    Apodo: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        unique: true
    },
    Nombre: {
        type: String,
        required: true,
        trim: true
    },
    Ocupacion: {
        type: String,
        required: true,
        trim: true
    },
    FechaRegistro: {
        type: Date,
        required: true,
        default: Date.now
    },
    FechaNacimiento: {
        type: String,
        required: true,
        match: /^\d{1,2}\/\d{1,2}\/\d{4}$/
    },
    Foto: {
        type: String,
        required: false,
        trim: true
    },
    Pais: {
        type: String,
        required: true,
        trim: true
    },
    Sexo: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino', 'Otro']
    },
    Estatus: {
        type: String,
        required: false,
        enum: ['Activo', 'Reportado', 'Pendiente'],
        default: 'Pendiente'
    }
});

const Cuenta = model('cuentas', cuentaSchema);
export default Cuenta;