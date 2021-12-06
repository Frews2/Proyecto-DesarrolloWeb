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
        required: true
    },
    Password: {
        type: String,
        required: true,
        unique: true
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
        match: /^\d{1,2}\/\d{1,2}\/\d{4}$/
    },
    FechaNacimiento: {
        type: String,
        required: true,
        match: /^\d{1,2}\/\d{1,2}\/\d{4}$/
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
        required: false,
        enum: ['Activo', 'Reportado', 'Pendiente'],
    }
});

const Cuenta = model('cuentas', cuentaSchema);
export default Cuenta;