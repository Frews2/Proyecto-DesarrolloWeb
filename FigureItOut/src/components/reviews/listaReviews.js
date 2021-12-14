import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import {BsArrowLeft,BsArrowRight} from "react-icons/bs";

const REVIEWS_POR_PAGINA = 5;
const API_LINK="https://figure-it-out-uv.herokuapp.com/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";
const LONGITUD_MAXIMA_TEXTO = 100;


export default function ListaReviews()
{
    const [reviews, setReviews] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const paginasVisitadas = numeroPagina * REVIEWS_POR_PAGINA;
  
  function definirBusqueda()
  {
    if(typeof window !== "undefined")
    {
      let queryString = window.location.search;
      let urlParametros = new URLSearchParams(queryString);
      
      var filtroBusqueda = urlParametros.get('busqueda');
      var enlaceBusqueda;

      if(filtroBusqueda !=null)
      {
        enlaceBusqueda= API_LINK+"reviews/Buscar?filtro="+filtroBusqueda;
      }
      else
      {
        enlaceBusqueda= API_LINK+"reviews/Buscar";
      }
      return enlaceBusqueda;
    }
  }

  function recortarTexto(noticiaTexto)
  {
    if (noticiaTexto.length > LONGITUD_MAXIMA_TEXTO)
    {
      noticiaTexto = noticiaTexto.substring(0, 99) + "...";
    }
    return noticiaTexto;
  }

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

  useEffect(() => 
  {
    const fetchData = async () => 
    {
      const res = await  fetch(definirBusqueda(), 
      {
        method: "GET",
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
      });

      const json = await res.json();
      if(json.exito === false && typeof window !== "undefined")
      {
        window.alert(json.mensaje);
      }
        setReviews(json.resultado);
    };
    fetchData();
  }, [setReviews]);
  
  const contadorPagina = reviews === null?0 :Math.ceil(reviews.length / REVIEWS_POR_PAGINA);
  const cambioPagina = ({ selected }) => 
  {
    setNumeroPagina(selected);
  };

  return (
    <div id="ListaReviews" className="App" onLoad={checarSesion()}>
      { reviews && reviews.length> 0? ( reviews
    .slice(paginasVisitadas, paginasVisitadas + REVIEWS_POR_PAGINA)
    .map((review) => 
    {
      return (
            <div className="contenedorPadrePublicacion" key={review.IdPublicacion}>
                <div className="columnasDivContenedor">
                    <h2 className="tituloContenedor">
                      <a href={"/reviews/verReview/?id="+ review.IdPublicacion}>{review.Titulo}</a>
                    </h2>
                    <h3 className="textoContenedor">{recortarTexto(review.Texto)}</h3>
                    <h3 className="textoContenedor">{"Calificacion: "+review.Calificacion+"/10"}</h3>
                </div>
                <div className="columnasDivContenedor">
                  <img className="fotoColumnaContenedor" src={API_IMAGENES + "type=" + review.TipoFoto + 
                  "&"+"path=reviews/" + review.NombreFoto} alt= {review.DescripcionFoto}></img>
                </div>
            </div>
      );
    })):
      (
      <h2 className='tituloContenedor'> No se han encontrado reviews </h2>
      )}
      <ReactPaginate
        previousLabel={<BsArrowLeft/>} nextLabel={<BsArrowRight/>}
        pageCount={contadorPagina} onPageChange={cambioPagina} 
        containerClassName={"paginationBttns"} previousLinkClassName={"paginacionBoton"} 
        nextLinkClassName={"paginacionBoton"} disabledClassName={"paginacionDesabilitada"} 
        activeClassName={"paginationActive"}
      />
    </div>
  );
}