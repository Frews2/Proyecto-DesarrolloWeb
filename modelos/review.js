/*
 Fecha: 16/10/2021
 Autor(s): Ricardo Moguel Sánchez
*/

import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const reviewSchema = new Schema(
{
  IdPublicacion: 
  {
    type: String,
    required: true,
    unique: true,
  },
  IdCuenta: 
  {
    type: String,
    required: true,
  },
  IdFigura: 
  {
    type: String,
    required: true,
  },
  Titulo: 
  {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Texto: 
  {
    type: String,
    required: true,
    trim: true
  },
  Calificacion: 
  {
    type: Number,
    required: true,
    match: /^[0-9]+$/,
    trim: true
  },
  Foto: 
  {
    type: String,
    required: true,
    trim: true
  },
  NombreFoto: 
  {
    type: String,
    required: true,
    trim: true
  },
  TipoFoto: 
  {
    type: String,
    required: true,
    trim: true
  },
  DescripcionFoto: 
  {
    type: String,
    required: true,
    trim: true
  },
  Etiquetas: 
  {
    type: [String],
    default: [] 
  },
  Comentarios: 
  {
    type: [String],
    default: []
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

const Review = model('reviews', reviewSchema);
export default Review;