/*
 Fecha: 20/11/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const comentarioSchema = new Schema(
{
  IdComentario: 
  { 
    type: String,
    required: true,
    unique: true
  },
  Texto:
  { 
    type: String,
    required: true,
    trim: true
  },
  IdPublicacionOriginal:
  { 
    type: String,
    required: true
  },
  IdCuenta:
  { 
    type: String,
    required: true
  },
  Apodo:
  { 
    type: String,
    required: true
  },
  FechaRegistro:
  {
    type: Date,
    required: true,
    default: Date.now
  },
  Estatus:
  {
    type: String,
    required: true,
    enum: ['Activo', 'Reportado'],
    default: 'Activo'
  }
});

const Comentario = model('comentarios', comentarioSchema);
export default Comentario;