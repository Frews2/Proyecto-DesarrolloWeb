import express from "express";
import mongo from "mongodb";
import assert from "assert";
import axios from "axios";

const router = express.Router();
const urlDB = process.env.DB_CONNECTION_STRING;
const client = new mongo(urlDB);

router.post("/RegisterUser", async (req, res) => {
    
    try{
        const {account} = req.body;
        var folderPath = process.cwd() + "/recursos/" + perfil + "/";
        var filePath = folderPath + archivo.name;
        
        let arregloBytes = archivo;
        let buffer = Buffer.from(arregloBytes.data.data);
        

        fileSystem.mkdir(folderPath, null, function (err) {
            if (err) {
                console.log('AVISO: Guardando en directorio existente');
            };
        })

        fileSystem.writeFile(filePath, buffer, function (err) {
            return res.status(200).json({
                success: true,
                origin: "RegisterAccount/SaveImg",
                data: {
                message: "Se guardo el archivo en directorio ",
                result: filePath} }); 
        })
    }
    catch (error) {
        console.error("Error en Guardar Imagen de perfil", error);
        return res.status(400).json({
        success: false,
        origin: "RegisterAccount/SaveImg",
        data: {
        message: "No se pudo guardar Imagen de perfil",
        result: null} }); 
    }
});

router.get("/ViewImg", async (req, res) => {
    try{
        const {path} = req.query;
        const {type} = req.query;
        var filePath = process.cwd() + "/recurso/" + path + type;

        var contentType = null;

        if ( type === ".png") {
            contentType = "image/png";
        } 
        else if ( type === ".jpeg") {
            contentType = "image/jpeg";
        } 
        else if ( type === ".jpg") {
            contentType = "image/jpg";
        }

        fileSystem.readFile(filePath, function(err, content)
        {
            if(err) {return res.status(400).json({
                success: false,
                origin: "RegisterAccount/ViewImg",
                data: {
                message: "No se pudo encontrar la imagen en ruta" + filePath,
                result: null} });
            }

            res.writeHead(200, { 
                "Content-Type": contentType });
            res.end(content, 'utf-8');
        })
    }
    catch (error) {
        console.error("Error al buscar imagen de perfil", error);
        return res.status(400).json({
        success: false,
        origin: "RegisterAccount/ViewImg",
        data: {
        message: "No se pudo mostrar la imagen",
        result: null} }); 
    }
});

export default router;