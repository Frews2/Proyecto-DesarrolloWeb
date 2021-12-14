import React from 'react';
import { useEffect, useState } from 'react';
import { CrearReporte } from "../../components/utilidades/crearReporte.js";


let queryString = window.location.search;
let urlParametros = new URLSearchParams(queryString);

const ID_REVIEW = urlParametros.get('id');
const API_LINK="https://figure-it-out-uv.herokuapp.com/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";


export default function VistaReview(){
    const [review, setReview] = useState([]);
    const [comentarios,setComentarios] =useState([]);

    function checarSesion()
    {
      if(sessionStorage.getItem('token') === null)
      {
        alert("Inicie sesion porfavor");
        window.location.pathname = '/'
      }

    }

  useEffect(() => 
  {
    const fetchData = async () => 
    {
      const res = await  fetch(API_LINK+"reviews/buscar?id="+ID_REVIEW, 
      {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      setReview(json.resultado[0]);
    };
    fetchData();
  }, [setReview]);

  useEffect(() => {
    const fetchData = async () => 
    {
      const res = await  fetch(API_LINK+"comentarios/buscar?idPublicacion="+ID_REVIEW, 
      {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      setComentarios(json.resultado);
    };
    fetchData();
  }, [setComentarios]);

    return (
          <div onLoad={checarSesion()}>
              <div>
                  <h1 className='tituloPublicacion'>{review && review.Titulo}</h1>
              </div>
              <div>
                  <h2 className='textoPublicacion'>{review &&  review.Texto}</h2>
              </div>
              <div>
                {review && <img className="fotoPublicacion" 
                src={API_IMAGENES + "type="+ review.TipoFoto +"&path=reviews/" + review.NombreFoto} 
                alt= {review.DescripcionFoto} ></img>}
              </div>
              <div>
                  <h2 className='textoPublicacion'>
                    {"Calificacion dada: "+[review &&  review.Calificacion]+"/10"}
                  </h2>
              </div>
              <h2 >Comentarios:</h2>
              {
          comentarios && comentarios.length > 0 ?( comentarios
          .map((comentarios) => {
            return(
              <div className='contenedorComentarios'>
                  <div className="contenedorComentario" key={comentarios.IdComentario} >
                    <h3 className="nombreUsuarioComentario">{comentarios.Apodo+":"}</h3>
                    <h3 className="textoComentario">{comentarios.Texto}</h3>
                          <h3 className="textoComentario">{"Registrado: "+comentarios.FechaRegistro}</h3>
                    <CrearReporte tipo={"Comentario"}></CrearReporte>
                  </div>
              </div>
            );}))
            :(
              <h2 className='tituloContenedor'> Aun no existen comentarios en esta publicacion </h2>
          )
          }
          </div>
    );
}