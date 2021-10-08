import mongoose from 'mongoose';

const cuentaSchema = new mongoose.Schema({
    Id: mongoose.Schema.Types.ObjectId,
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    TipoCuenta: {
        type: String,
        required: true,
        enum: ['Periodista', 'Coleccionista', 'Administrador']
    },
    Password: {
        type: String,
        required: true,
        unique: true
    }
});

const Cuenta = mongoose.model('Cuentas', cuentaSchema);
export default Cuenta;