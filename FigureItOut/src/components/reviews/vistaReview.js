import React from 'react';
import { useEffect, useState } from 'react';
import { CrearReporte } from "../../components/utilidades/crearReporte.js";

const API_LINK="https://figure-it-out-uv.herokuapp.com/";
const API_IMAGENES = API_LINK+"imagenes/ver?";

export default function VistaReview(){
    const [review, setReview] = useState([]);
    const [comentarios,setComentarios] =useState([]);

    function checarSesion()
    {
      if(typeof window !== 'undefined')
      {
        if(sessionStorage.getItem('token') === null)
        {
          window.alert("Inicie sesion porfavor");
          window.location.pathname = '/'
        }
      }
    }
    
    function recortarTexto(fecha)
    {
      fecha = fecha.substring(0, 10);

      return fecha;
    }

  useEffect(() => 
  {
    if(typeof window !== "undefined")
    {
      let queryString = window.location.search;
      let urlParametros = new URLSearchParams(queryString);
      var idReview = urlParametros.get('id');
    
      const fetchData = async () => 
      {
        const res = await  fetch(API_LINK+"reviews/buscar?id="+idReview, 
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
  }
}, [setReview]);

  useEffect(() => {
    if(typeof window !== "undefined")
    {
      let queryString = window.location.search;
      let urlParametros = new URLSearchParams(queryString);

      var idReview = urlParametros.get('id');
      const fetchData = async () => 
      {
        const res = await  fetch(API_LINK+"comentarios/buscar?idPublicacion="+idReview, 
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
                  <h1 className='tituloPublicacion'>{review && review.Titulo}</h1>
              </div>
              <div>
                  <h2 className='textoPublicacion'>{review &&  review.Texto}</h2>
              </div>
              <div>
                {review && <img className="fotoPublicacion" 
                src={API_IMAGENES + "direccion=reviews/"+ review.NombreFoto +"&tipo=" + review.TipoFoto} 
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
              <div className='contenedorComentarios'  key={comentarios.IdComentario} >
                  <div className="contenedorComentario">
                    <h3 className="nombreUsuarioComentario">{comentarios.Apodo+":"}</h3>
                    <h3 className="textoComentario">{comentarios.Texto}</h3>
                          <h3 className="textoComentario">{"Registrado en : "+ recortarTexto(comentarios.FechaRegistro)}</h3>
                    <CrearReporte tipo={"Comentario"} id={comentarios.IdComentario}></CrearReporte>
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