import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Apodo: {
        type: String,
        required: true
    }
});

const Administrador = mongoose.model('Administradores', adminSchema);
export default Administrador;