import mongoose from 'mongoose';

const contraseniaSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        validate: [validators.notEmpty, 'Password is empty']
    }
});

const Contrasenia = mongoose.model('Contrasenias', contraseniaSchema);
export default Contrasenia;