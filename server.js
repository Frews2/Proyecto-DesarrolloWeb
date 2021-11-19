/*
 Date: 04/10/2021
 Author(s): Ricardo Moguel Sanchez
*/
import express from "express";
import cuentaRouter from './rutas/cuentas.js';
import criticasRouter from './rutas/reviews.js';
import imagenRouter from "./rutas/imagenes.js";
import codigosRouter from "./rutas/codigos.js";
import noticiasRouter from './rutas/noticias.js';
import figurasRouter from "./rutas/figuras.js";
import cors from 'cors';
import fileupload from "express-fileupload";
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;
const URL_BASE_DE_DATOS = process.env.DB_CONNECTION_STRING;
const USUARIO_BASE_DE_DATOS = process.env.MONGO_USERNAME;
const CONTRASENIA_BASE_DE_DATOS = process.env.MONGO_PASSWORD;

mongoose.connect(URL_BASE_DE_DATOS,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: USUARIO_BASE_DE_DATOS,
    pass: CONTRASENIA_BASE_DE_DATOS
}).then(() => {
    console.log('EXITO: Conectado a la base de datos de FigureItOut');
}).catch(eror => {
    console.log(eror);
    process.exit();
});

const rutasDisponibles = [
    'http://localhost:27017'
]

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (rutasDisponibles.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false } 
    }
    callback(null, corsOptions)
}
 
app.use(cors());
app.use(fileupload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use("/cuentas", cors(corsOptionsDelegate), cuentaRouter);
app.use("/reviews", cors(corsOptionsDelegate), criticasRouter);
app.use("/codigos", cors(corsOptionsDelegate), codigosRouter);
app.use("/imagenes", cors(corsOptionsDelegate), imagenRouter);
app.use("/noticias", cors(corsOptionsDelegate), noticiasRouter);
app.use("/figuras", cors(corsOptionsDelegate), figurasRouter);

app.all("*", cors(corsOptionsDelegate), (req, res) => res.status(404).send({
    success: false,
    msg: "ERROR: Ruta ingresada no existe"}));

const server = app.listen(PORT, () => console.log(`EXITO: SERVIDOR CORRIENDO EN PUERTO: ${PORT}`));
export { app, server };