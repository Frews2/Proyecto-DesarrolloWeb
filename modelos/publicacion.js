import mongoose from "mongoose";

const { model, Schema } = mongoose;

const publicacionSchema = new Schema({
    IdPublicacion: {
        type: String,
        required: true,
        unique: true,
    },
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    FechaRegistro: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Publicacion = model("publicaciones", publicacionSchema);
export default Publicacion;