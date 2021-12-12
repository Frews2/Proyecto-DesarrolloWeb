import React from 'react'
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import {BsArrowLeft,BsArrowRight} from "react-icons/bs";

const PAGE_NUMBER = 1;
const REVIEWS_POR_PAGINA = 5;
const API_IMAGENES = "http://localhost:4000/imagenes/Ver?";
const API_LINK="http://localhost:4000/";
const LONGITUD_MAXIMA_TEXTO = 100;
let queryString = window.location.search;
let urlParametros = new URLSearchParams(queryString);
const FILTRO_BUSQUEDA = urlParametros.get('busqueda');


export default function ListaReviews()
{
    const [reviews, setReviews] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const paginasVisitadas = numeroPagina * REVIEWS_POR_PAGINA;
  
  function definirBusqueda()
  {
    var enlaceBusqueda;

    if(FILTRO_BUSQUEDA !=null)
    {
      enlaceBusqueda= API_LINK+"reviews/Buscar?filtro="+FILTRO_BUSQUEDA;
    }
    else
    {
      enlaceBusqueda= API_LINK+"reviews/Buscar";
    }
    return enlaceBusqueda;
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
      if(json.exito === false)
      {
        alert(json.mensaje + "\nInicie sesion por favor");
        window.location.pathname = '/';
      }
        setReviews(json.resultado);
    };
    fetchData();
  }, [setReviews]);
  
  const contadorPagina = reviews === null?0 :Math.ceil(reviews.length / REVIEWS_POR_PAGINA);
  const changePage = ({ selected }) => 
  {
    setNumeroPagina(selected);
  };

  return (
    <div id="ListaReviews" className="App" onLoad={checarSesion()}>
      { reviews && reviews.length> 0? ( reviews
    .slice(paginasVisitadas, paginasVisitadas + REVIEWS_POR_PAGINA)
    .map((review) => {
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
    })):(
      <h2 className='tituloContenedor'> No se han encontrado reviews </h2>
      )}
      <ReactPaginate
        previousLabel={<BsArrowLeft/>} nextLabel={<BsArrowRight/>}
        pageCount={contadorPagina} onPageChange={changePage} 
        containerClassName={"paginationBttns"} previousLinkClassName={"paginacionBoton"} 
        nextLinkClassName={"paginacionBoton"} disabledClassName={"paginacionDesabilitada"} 
        activeClassName={"paginationActive"}
      />

    </div>
  );
}