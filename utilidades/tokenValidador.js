import jwt from 'jsonwebtoken';
const KEY = process.env.JWT_KEY;

export function ChecarTokenActivo(req, res, next) {
    const tokenRecibido = req.headers['authorization'];
  
    if (typeof tokenRecibido !== 'undefined') {
      jwt.verify(tokenRecibido, KEY, (error, authData) => {
        if (error) {
          res.status(403).send(
            {
              exito: false,
              mensaje: "ERROR: El token es invalido o ha expirado",
              resultado: null,
            }
          )
        }else{
          next();
        }
      })
  
    }else{
      res.status(403).send(
        {
          exitoso: false,
          mensaje: "ERROR: El token no tiene el formato necesario. Realice su login nuevamente.",
          data: null,
        }
      )
    }
  }