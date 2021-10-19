import mongoose from "mongoose";

const { model, Schema } = mongoose;

const codigoSchema = new Schema(
  {
    Correo: { type: String, required: true },
    Numero: { type: Number, required: true },
    FechaCreacion: { type: Date, default: Date.now, expires: '30m'}
  }
);

const Codigo = model("codigos", codigoSchema);
export default Codigo;