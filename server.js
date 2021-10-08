/*
 Date: 04/10/2021
 Author(s): Ricardo Moguel Sanchez
*/
import express from "express";
import accountRouter from './routes/accounts.js';
/*
import newsRouter from './routes/news.js';
import publicationRouter from './routes/publications.js';*/
import imageRouter from "./routes/images.js";
import cors from 'cors';
import fileupload from "express-fileupload";
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;
const urlDB = process.env.DB_CONNECTION_STRING;

mongoose.connect(urlDB).then(() => {
    console.log('successfully connected to database');
    }).catch(err => {
    console.log(err);
    process.exit();
});

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
 
app.use(cors());
app.use(fileupload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use("/accounts", cors(corsOptionsDelegate), accountRouter);
/*
app.use("/news", cors(corsOptionsDelegate), newsRouter);
app.use("/publication", cors(corsOptionsDelegate), publicationRouter);*/
app.use("/images", cors(corsOptionsDelegate), imageRouter);

app.all("*", cors(corsOptionsDelegate), (req, res) => res.status(404).send({
    success: false,
    msg: "This route does not exist"}));

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));