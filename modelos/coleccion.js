import mongoose from "mongoose";

const { model, Schema } = mongoose;

const coleccionSchema = new Schema({
    IdColeccion: {
        type: String,
        required: true,
        unique: true,
    },
    IdCuenta: {
        type: String,
        required: true,
        unique: true,
    },
    Figuras: {
        type: [String],
        default: [] 
    }
});

const Coleccion = model("colecciones", coleccionSchema);
export default Coleccion;