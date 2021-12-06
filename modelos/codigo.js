import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const codigoSchema = new Schema({
  Correo: { 
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
  },
  Numero: { 
    type: Number, 
    required: true,
    match: /^[0-9]+$/
  },
  FechaCreacion: { 
    type: Date, 
    default: Date.now, 
    expires: '30m'
  }
});

const Codigo = model('codigos', codigoSchema);
export default Codigo;