import React from 'react'
import { useEffect, useState } from 'react';

const API_LINK="http://localhost:4000/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";
const queryString = window.location.search;
const urlParametros = new URLSearchParams(queryString);
const idNoticia = urlParametros.get('id');


export default function VistaNoticia(){
    const [noticia, setNoticia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await  fetch(API_LINK+"noticias/obtenerPorId?id="+idNoticia, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
      const json = await res.json();
      setNoticia(json.resultado[0]);
    };
    fetchData();
  }, [setNoticia]);
  
    return (
          <div>
              <div>
                  <h1 className='tituloPublicacion'>{noticia && noticia.Titulo}</h1>
              </div>
              <div>
                  <h2 className='textoPublicacion'>{noticia && noticia.Texto}</h2>
              </div>
              <div>
                {noticia && <img className="fotoPublicacion" 
                src={API_IMAGENES + "type="+ noticia.TipoFoto +"&"+"path=noticias/" + noticia.NombreFoto} 
                alt= {noticia.DescripcionFoto} ></img>}
              </div>
          </div>
    );

}