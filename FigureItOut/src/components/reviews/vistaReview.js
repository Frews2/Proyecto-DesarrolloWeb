import React from 'react';
import { useEffect, useState } from 'react';

const API_LINK="http://localhost:4000/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";

let queryString = window.location.search;
let urlParametros = new URLSearchParams(queryString);
const ID_REVIEW = urlParametros.get('id');


export default function VistaReview(){
    const [review, setReview] = useState([]);
    const [comentarios,setComentarios] =useState([]);

  useEffect(() => 
  {
    const fetchData = async () => 
    {
      const res = await  fetch(API_LINK+"reviews/obtenerPorId?id="+ID_REVIEW, 
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

    return (
          <div>
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
          </div>
    );
}