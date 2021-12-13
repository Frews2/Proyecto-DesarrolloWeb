import express from 'express';
import fileSystem, { fstat } from 'fs';

const router = express.Router();

router.get('/Ver', async (req, res) => {
  try{
    const {direccion} = req.query;
    const {tipo} = req.query;
    var directorio = process.cwd() + '/recursos/' + direccion + tipo;
    var tipoImagen = null;

    if ( tipo === '.png') {
      tipoImagen = 'image/png';
    } 
    else{
      if ( tipo === '.jpeg') {
        tipoImagen = 'image/jpeg';
      } else{
        if ( tipo === '.jpg') {
          tipoImagen = 'image/jpg';
        }
      }
    } 

    fileSystem.readFile(directorio, function(err, contenido){
      if(err) {return res.status(404).json({
        exito: false,
        origen: 'imagenes/Ver',
        mensaje: 'ERROR: No se pudo encontrar la imagen en ruta ' + directorio, 
        resultado: err
       });
      }
      res.writeHead(200, { 
        'Content-Type': tipoImagen });
      res.end(contenido, 'utf-8');
    });
  }
  catch (error) {
    console.error('ERRPR: Al buscar imagen', error);
    return res.status(500).json({
      exito: false,
      origen: 'imagenes/Ver',
      mensaje: 'ERROR: Ocurrió un error al mostrar la imagen',
      resultado: error
    }); 
  }
});

export default router;