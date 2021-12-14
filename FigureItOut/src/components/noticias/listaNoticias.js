import React from 'react'
import { useEffect, useState } from 'react';
import {BsArrowLeft,BsArrowRight} from "react-icons/bs";
import ReactPaginate from "react-paginate";

const NOTICIAS_POR_PAGINA = 5;
const LONGITUD_MAXIMA_TEXTO = 150;
const API_LINK="https://figure-it-out-uv.herokuapp.com/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";


export default function noticias() {
  const [noticias, setNoticias] = useState([]);
  const [numeroPagina, setNumeroPagina] = useState(0);
  const paginasVisitadas = numeroPagina * NOTICIAS_POR_PAGINA;

  function definirBusqueda(){
    if(typeof window !== "undefined")
    {
      let queryString = window.location.search;
      let urlParametros = new URLSearchParams(queryString);

      var filtroBusqueda = urlParametros.get('busqueda');
      var enlaceBusqueda;
      
      if(filtroBusqueda !=null)
      {
        enlaceBusqueda= API_LINK+"noticias/Buscar?filtro="+filtroBusqueda;
      }
      else
      {
        enlaceBusqueda= API_LINK+"noticias/Buscar";
      }
    }
    return enlaceBusqueda;
  }

  function recortarTexto(noticiaTexto){
    if (noticiaTexto.length > LONGITUD_MAXIMA_TEXTO) {
      noticiaTexto = noticiaTexto.substring(0, 199) + "...";
    }
    return noticiaTexto;
  }


  useEffect(() => 
  {
    const fetchData = async () => 
    {
      const res = await  fetch(definirBusqueda(), 
      {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
      const json = await res.json();
      setNoticias(json.resultado);
    };
    fetchData();
  }, [setNoticias]);

  const contadorPagina = noticias === null?0:Math.ceil(noticias.length / NOTICIAS_POR_PAGINA);
  const cambioPagina = ({ selected }) => {
    setNumeroPagina(selected);
  };

  
  return (
    <div className="App" >
      {
        noticias && noticias.length > 0 ?( noticias
        .slice(paginasVisitadas, paginasVisitadas + NOTICIAS_POR_PAGINA)
        .map((noticia) => {
          return(
                <div className="contenedorPadreNoticias" key={noticia.IdPublicacion} >
                    <div className="columnasDivContenedor">
                        <h2 className="tituloContenedor"><a href={"/noticias/verNoticia/?id="+ 
                        noticia.IdPublicacion}>{noticia.Titulo}</a></h2>
                        <h3 className="textoContenedor">{recortarTexto(noticia.Texto)}</h3>
                    </div>
                    <div className="columnasDivContenedor">
                      <img className="fotoColumnaContenedor" src={API_IMAGENES + "direccion=noticias/"+ noticia.NombreFoto +
                      "&tipo=" + noticia.TipoFoto} alt= {noticia.DescripcionFoto}></img>
                      
                    </div>
                </div>
          );}))
          :(
            <h2 className='tituloContenedor'> No se han encontrado noticias referente a tu busqueda </h2>
          )
      }
      <ReactPaginate
        previousLabel={<BsArrowLeft/>} nextLabel={<BsArrowRight/>}
        pageCount={contadorPagina} onPageChange={cambioPagina}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"paginacionBoton"}
        nextLinkClassName={"paginacionBoton"}
        disabledClassName={"paginacionDesabilitada"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}