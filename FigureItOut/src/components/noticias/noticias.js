import React from 'react'
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import '../../css/figureItOutStyle.css';

const PAGE_NUMBER = 1;
const NOTICIAS_POR_PAGINA = 1;
const API_IMAGENES = "http://localhost:4000/imagenes/Ver?";


export default function noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await  fetch("http://localhost:4000/noticias/Buscar", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
      const json = await res.json();
      console.log(json.resultado);
      setNoticias(json.resultado);
    };
    fetchData();
  }, [setNoticias]);
  const [numeroPagina, setNumeroPagina] = useState(0);

  const pagesVisited = numeroPagina * NOTICIAS_POR_PAGINA;

  const displayNoticias = noticias
    .slice(pagesVisited, pagesVisited + NOTICIAS_POR_PAGINA)
    .map((notice) => {
      return (
            <div className="contenedorPadre">
                <div className="columnasDivContenedor">
                    <h2 className="tituloNoticia">{notice.Titulo}</h2>
                    <h3 className="textoNoticia">{notice.Texto}</h3>
                </div>
                <div className="columnasDivContenedor">
                  <img className="fotoColumnaContenedor" src={API_IMAGENES + "type="+ notice.TipoFoto +"&"+"path=noticias/" + notice.NombreFoto} ></img>
                </div>
            </div>
      );
    });

  const contadorPagina = Math.ceil(noticias.length / NOTICIAS_POR_PAGINA);
  console.log(contadorPagina);

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