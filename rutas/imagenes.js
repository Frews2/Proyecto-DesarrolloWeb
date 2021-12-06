import express from 'express';
import fileSystem, { fstat } from 'fs';

const router = express.Router();

router.post('/GuardarImagen', async (req, res) => {
  
  try{
    const {perfil} = req.query;
    const {archivo} = req.body;
    var folderPath = process.cwd() + '/recursos/' + perfil + '/';
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
        origin: 'imagenes/GuardarImagen',
        data: {
        message: 'Se guardo el archivo en directorio ',
        result: filePath} }); 
    })
  }
  catch (error) {
    console.error('Error en Guardar Imagen de perfil', error);
    return res.status(400).json({
    success: false,
    origin: 'imagenes/GuardarImagen',
    data: {
    message: 'No se pudo guardar Imagen de perfil',
    result: null} }); 
  }
});

router.get('/Ver', async (req, res) => {
  try{
    const {path} = req.query;
    const {type} = req.query;
    var directorio = process.cwd() + '/recursos/' + path + type;

    var contentType = null;

    if ( type === '.png') {
      contentType = 'image/png';
    } 
    else if ( type === '.jpeg') {
      contentType = 'image/jpeg';
    } 
    else if ( type === '.jpg') {
      contentType = 'image/jpg';
    }

    fileSystem.readFile(directorio, function(err, content)
    {
      if(err) {return res.status(400).json({
        success: false,
        origin: 'imagenes/Ver',
        data: {
        message: 'No se pudo encontrar la imagen en ruta' + directorio,
        result: null} });
      }

      res.writeHead(200, { 
        'Content-Type': contentType });
      res.end(content, 'utf-8');
    })
  }
  catch (error) {
    console.error('Error al buscar imagen de perfil', error);
    return res.status(400).json({
    success: false,
    origin: 'imagenes/Ver',
    data: {
    message: 'No se pudo mostrar la imagen',
    result: null} }); 
  }
});

export default router;