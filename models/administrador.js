import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Apodo: {
        type: String,
        required: true,
        validate: [validators.notEmpty, 'Nickname is empty']
    }
});

const Administrador = mongoose.model('Administradores', adminSchema);
export default Administrador;