import React from 'react'
import { useEffect, useState } from 'react';

import { CrearReporte } from "../../components/utilidades/crearReporte.js";

const API_LINK="https://figure-it-out-uv.herokuapp.com/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";


export default function VistaNoticia()
{
  const [noticia, setNoticia] = useState([]);
  const [comentarios,setComentarios] =useState([]);
    
  function checarSesion()
  {
    if(typeof window !== 'undefined')
    {
      if(sessionStorage.getItem('token') === null)
      {
        window.alert("Inicie sesion porfavor");
        window.location.pathname = '/';
      }
    }
  }

  useEffect(() => 
  {
    if(typeof window !== "undefined")
    {
      let queryString = window.location.search;
      let urlParametros = new URLSearchParams(queryString);

      var idPublicacion = urlParametros.get('id');
      const fetchData = async () => 
      {
        const res = await  fetch(API_LINK+"noticias/buscar?id="+idPublicacion, 
        {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
        });
        const json = await res.json();
        setNoticia(json.resultado[0]);
      };
      fetchData();
    }
  }, [setNoticia]);

  useEffect(() => 
  {
    if(typeof window !== "undefined")
    {
      let queryString = window.location.search;
      let urlParametros = new URLSearchParams(queryString);

      var idPublicacion = urlParametros.get('id');
      const fetchData = async () => 
      {
        const res = await  fetch(API_LINK+"comentarios/buscar?idPublicacion="+idPublicacion, 
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
    }
  }, [setComentarios]);
  
    return (
          <div onLoad={checarSesion()}>
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

              <div>
                  <span className="etiquetasPublicacion">Etiquetas: {noticia && noticia.Etiquetas+","}</span>
              </div>

              <h2 >Comentarios:</h2>
              {
                comentarios && comentarios.length > 0 ?( comentarios
                .map((comentarios) => {
                  return(
                    <div className='contenedorComentarios' key={comentarios.IdComentario} >
                        <div className="contenedorComentario">
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