import jwt from 'jsonwebtoken';

function validarToken(req,res,next){
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.send('Acceso Denegado');

    jwt.verify(accessToken, process.env.SECRET, (err,user) =>{
        if(err){
            res.send('Accesso denegado, token incorrecto o expirado');
        }else{
            req.user = user;
            next();
        }
    });
}