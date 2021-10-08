import mongoose from 'mongoose';

const cuentaSchema = new mongoose.Schema({
    Id: mongoose.Schema.Types.ObjectId,
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
        validate: [validators.notEmpty, 'Email is empty']
    },
    TipoCuenta: {
        type: String,
        required: true,
        enum: ['Periodista', 'Coleccionista', 'Administrador'],
        validate: [validators.notEmpty, 'Account type is empty']
    },
    Password: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.notEmpty, 'Password is empty']
    }
});

const Cuenta = mongoose.model('Cuentas', cuentaSchema);
export default Cuenta;