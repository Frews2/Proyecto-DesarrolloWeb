import React from 'react'
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import '../../css/figureItOutStyle.css';

const PAGE_NUMBER = 1;
const FIGURAS_POR_PAGINA = 3;
const API_LINK = "http://localhost:4000/"
const API_IMAGENES = API_LINK+"imagenes/Ver?";


export default function ListaFiguras() {
  const [figuras, setFiguras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await  fetch(API_LINK+"figuras/Buscar", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
      const json = await res.json();
      setFiguras(json.resultado);
    };
    fetchData();
  }, [setFiguras]);
  const [numeroPagina, setNumeroPagina] = useState(0);

  const paginasVisitadas = numeroPagina * FIGURAS_POR_PAGINA;

  const displayFiguras = figuras
    .slice(paginasVisitadas, paginasVisitadas + FIGURAS_POR_PAGINA)
    .map((figuraJson) => {
      return (
        <div>
            <div className="contenedorPadreFiguras" key={figuraJson.IdFigura}>
                <div className="columnasDivContenedor" >
                    <h2 className="tituloContenedor">{figuraJson.Nombre}</h2>
                    <h3 className="textoContenedor"> {"Tiene una altura de: "+figuraJson.Altura +" cm"}</h3>
                    <h3 className="textoContenedor"> {"Marca: "+figuraJson.Marca}</h3>
                    <h3 className="textoContenedor"> {"Material: "+figuraJson.Material}</h3>
                </div>
                <div className="columnasDivContenedor">
                  <img className="fotoColumnaContenedor" src={API_IMAGENES + "type="+ figuraJson.TipoFoto +"&"+"path=figuras/" + figuraJson.NombreFoto} ></img>
                </div>
            </div>
        </div>
      );
    });

  const contadorPagina = Math.ceil(figuras.length / FIGURAS_POR_PAGINA);
  const changePage = ({ selected }) => {
    setNumeroPagina(selected);
  };

  

  return (
    <div className="App">
      {displayFiguras}
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