const MIN = 10000;
const MAX = 99999;

export default function generarCodigoAzar() {
  var codigo = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  return codigo;
}