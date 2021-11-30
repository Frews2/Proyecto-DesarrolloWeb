import React from 'react'
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import '../../css/figureItOutStyle.css';

const PAGE_NUMBER = 1;
const NOTICIAS_POR_PAGINA = 1;
const API_LINK="http://localhost:4000/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";


export default function noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await  fetch(API_LINK+"noticias/Buscar", {
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
  const [numeroPagina, setNumeroPagina] = useState(0);

  const paginasVisitadas = numeroPagina * NOTICIAS_POR_PAGINA;

  const displayNoticias = noticias
    .slice(paginasVisitadas, paginasVisitadas + NOTICIAS_POR_PAGINA)
    .map((noticia) => {
      return (
            <div className="contenedorPadreNoticias" key={noticia.IdPublicacion} >
                <div className="columnasDivContenedor">
                    <h2 className="tituloContenedor"><a href={"/noticias/verNoticia/?id="+ noticia.IdPublicacion}>{noticia.Titulo}</a></h2>
                    <h3 className="textoContenedor">{noticia.Texto}</h3>
                </div>
                <div className="columnasDivContenedor">
                  <img className="fotoColumnaContenedor" src={API_IMAGENES + "type="+ noticia.TipoFoto +"&"+"path=noticias/" + noticia.NombreFoto} ></img>
                </div>
            </div>
      );
    });

  const contadorPagina = Math.ceil(noticias.length / NOTICIAS_POR_PAGINA);

  const changePage = ({ selected }) => {
    setNumeroPagina(selected);
  };

  

  return (
    <div className="App">
      {displayNoticias}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={contadorPagina}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}