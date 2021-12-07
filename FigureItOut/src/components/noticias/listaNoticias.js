import React from 'react'
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";

const PAGE_NUMBER = 1;
const NOTICIAS_POR_PAGINA = 5;
const API_LINK="http://localhost:4000/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";
const queryString = window.location.search;
const urlParametros = new URLSearchParams(queryString);
const FILTRO_BUSQUEDA = urlParametros.get('busqueda');


export default function noticias() {
  const [noticias, setNoticias] = useState([]);
  const [numeroPagina, setNumeroPagina] = useState(0);
  const paginasVisitadas = numeroPagina * NOTICIAS_POR_PAGINA;

  function definirBusqueda(){
    var enlaceBusqueda;
      if(FILTRO_BUSQUEDA !=null)
      {
        enlaceBusqueda= API_LINK+"noticias/Buscar?filtro="+FILTRO_BUSQUEDA;
      }
      else
      {
        enlaceBusqueda= API_LINK+"noticias/Buscar";
      }
    return enlaceBusqueda;
  }

  function recortarTexto(noticiaTexto){
    if (noticiaTexto.length > 200) {
      noticiaTexto = noticiaTexto.substring(0, 199) + "...";
    }
    return noticiaTexto;
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await  fetch(definirBusqueda(), {
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

  const contadorPagina = noticias===null?0:Math.ceil(noticias.length / NOTICIAS_POR_PAGINA);
  const changePage = ({ selected }) => {
    setNumeroPagina(selected);
  };

  return (
    <div className="App">
      {
      noticias && noticias.length > 0 ?( noticias
      .slice(paginasVisitadas, paginasVisitadas + NOTICIAS_POR_PAGINA)
      .map((noticia) => {
        return(
              <div className="contenedorPadreNoticias" key={noticia.IdPublicacion} >
                  <div className="columnasDivContenedor">
                      <h2 className="tituloContenedor"><a href={"/noticias/verNoticia/?id="+ noticia.IdPublicacion}>{noticia.Titulo}</a></h2>
                      <h3 className="textoContenedor">{recortarTexto(noticia.Texto)}</h3>
                  </div>
                  <div className="columnasDivContenedor">
                    <img className="fotoColumnaContenedor" src={API_IMAGENES + "type="+ noticia.TipoFoto +"&"+"path=noticias/" + noticia.NombreFoto} 
                     alt= {noticia.DescripcionFoto}></img>
                  </div>
              </div>
        );}))
        :(
          <h2 className='tituloContenedor'> No se han encontrado noticias referente a tu busqueda </h2>
      )
      }
      <ReactPaginate
        previousLabel={"Anterior"} nextLabel={"Siguiente"}
        pageCount={contadorPagina} onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}