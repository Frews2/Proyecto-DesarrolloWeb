import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;
const INDEFINIDO = 'undefined';

export function ChecarTokenActivo(req, res, next) {
  const tokenRecibido = req.headers.authorization;
  
  var resultadoJson = {
    exito: false,
    origen: '/utilidades/tokenValidador',
    mensaje: 'ERROR: No se encuentra un token adjunto.',
    resultado: null,
    tokenValido: false
  };
  
  if(!tokenRecibido){
    res.status(403).send(resultadoJson);
  }

  if (typeof tokenRecibido !== INDEFINIDO) {
    jwt.verify(tokenRecibido, KEY, (error, authData) => {
      if (error) {
        resultadoJson.mensaje = 'ERROR: El token es invalido o ha expirado.';
        res.status(403).send(resultadoJson);
      }else{
        req.body.IdCuenta = authData.IdCuenta;
        req.body.Apodo = authData.Apodo;
        next();
      }
    });
  }else{
    resultadoJson = 'ERROR: ' +
    'El token no tiene el formato necesario. Realice su login nuevamente.';
    res.status(405).send(resultadoJson);
  }
}