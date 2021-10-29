import Figura from "../modelos/Figura.js";

export async function existeFigura(idFigura) {
    return Figura.exists({ IdFigura: idFigura})
      .then((existe) => {
        return existe;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
}

export async function obtenerFiguras() {
  return Figura.find()
    .then((figuras) => {
      return figuras;
    })
    .catch((err) => {
      console.error(err);

      return [];
    })
}