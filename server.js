/*
 Fecha: 04/10/2021
 Autor(s): Ricardo Moguel Sánchez
*/
import express from 'express';
import cuentaRouter from './rutas/cuentas.js';
import criticasRouter from './rutas/reviews.js';
import imagenRouter from './rutas/imagenes.js';
import codigosRouter from './rutas/codigos.js';
import noticiasRouter from './rutas/noticias.js';
import figurasRouter from './rutas/figuras.js';
import comentariosRouter from './rutas/comentarios.js';
import reportesRouter from './rutas/reportes.js';
import cors from 'cors';
import fileupload from 'express-fileupload';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4100 ;
const URL_BASE_DE_DATOS = process.env.DB_CONNECTION_STRING;
const USUARIO_BASE_DE_DATOS = process.env.MONGO_USERNAME;
const CONTRASENIA_BASE_DE_DATOS = process.env.MONGO_PASSWORD;

mongoose.connect(URL_BASE_DE_DATOS,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: USUARIO_BASE_DE_DATOS,
  pass: CONTRASENIA_BASE_DE_DATOS
}).then(() => {
  console.log('ÉXITO: Conectado a la base de datos de FigureItOut');
}).catch(eror => {
  console.error(eror);
  process.exit();
});

const rutasDisponibles = [
  'http://localhost:27017'
];

var corsOptionsDelegate = function (req, callback) {
  var opcionesCors;
  if (rutasDisponibles.indexOf(req.header('Origin')) !== -1) {
    opcionesCors = { origin: true };
  } else {
    opcionesCors = { origin: false } ;
  }
  callback(null, opcionesCors);
};
 
app.use(cors());
app.use(fileupload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ 
  limit: '50mb', 
  extended: true, 
  parameterLimit: 50000 }));

app.use('/cuentas', cors(corsOptionsDelegate), cuentaRouter);
app.use('/reviews', cors(corsOptionsDelegate), criticasRouter);
app.use('/codigos', cors(corsOptionsDelegate), codigosRouter);
app.use('/imagenes', cors(corsOptionsDelegate), imagenRouter);
app.use('/noticias', cors(corsOptionsDelegate), noticiasRouter);
app.use('/figuras', cors(corsOptionsDelegate), figurasRouter);
app.use('/comentarios', cors(corsOptionsDelegate), comentariosRouter);
app.use('/reportes', cors(corsOptionsDelegate), reportesRouter);

app.all('*', cors(corsOptionsDelegate), (req, res) => res.status(404).send({
  exito: false,
  mensaje: 'ERROR: Ruta ingresada no existe'}));

const server = app.listen(PORT, () => 
console.log(`ÉXITO: SERVIDOR CORRIENDO EN PUERTO: ${PORT}`));
export { app, server };