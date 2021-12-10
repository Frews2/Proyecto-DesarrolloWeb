import { createTransport } from 'nodemailer';

const USUARIO = process.env.EMAIL_SERVICE_SENDER;
const CONTRASENIA = process.env.EMAIL_SERVICE_PASSWORD;

const transporteDeCorreo = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: USUARIO,
    pass: CONTRASENIA
  },
});

const ENVIADOR_CORREO = '"FigureItOut Team" <figureitoutpage@gmail.com>';


export default async function mandarCodigoConfirmacion(
  email,
  codigoVerificacion) {
  const CORREO = {
    from: ENVIADOR_CORREO,
    to: email,
    subject: 'Email de Confirmación para registro de cuenta',
    html: `<h1>Estimado Usuario<h1/>
    <p>¡Estas a un paso de formar parte de nuestra comunidad!</p>
    <p>Tu código de confirmación es <strong>${codigoVerificacion}</strong>.</p>`
  };

  return transporteDeCorreo.sendMail(CORREO)
  .then((respuesta) => {
    if (respuesta.accepted) {
      console.log('ÉXITO: Correo mandado. ' + respuesta);
      return true;
    } else{
      return false;
    }
  })
  .catch((error) => {
    console.error('ERROR: No se mandó correo. ' + error);
    return false;
  });
}