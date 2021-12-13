import React from 'react'
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import {BsArrowLeft,BsArrowRight} from "react-icons/bs";

let queryString = window.location.search;
let urlParametros = new URLSearchParams(queryString);

const FILTRO_BUSQUEDA = urlParametros.get('busqueda');
const FIGURAS_POR_PAGINA = 3;
const API_LINK = "http://localhost:4000/"
const API_IMAGENES = API_LINK+"imagenes/Ver?";


export default function ListaFiguras() {
  const [figuras, setFiguras] = useState([]);
  const [numeroPagina, setNumeroPagina] = useState(0);
  const paginasVisitadas = numeroPagina * FIGURAS_POR_PAGINA;

  function definirBusqueda()
  {
    var enlaceBusqueda;
      if(FILTRO_BUSQUEDA !=null)
      {
        enlaceBusqueda= API_LINK+"figuras/Buscar?filtro="+FILTRO_BUSQUEDA;
      }
      else
      {
        enlaceBusqueda= API_LINK+"figuras/Buscar";
      }
    return enlaceBusqueda;
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
      setFiguras(json.resultado);
    };
    fetchData();
  }, [setFiguras]);

  const contadorPagina = figuras===null?0:Math.ceil(figuras.length / FIGURAS_POR_PAGINA);
  const cambioPagina = ({ selected }) => 
  {
    setNumeroPagina(selected);
  };

  return (
    <div className="App" onLoad={checarSesion()}>
    {figuras && figuras.length> 0 ?(figuras
    .slice(paginasVisitadas, paginasVisitadas + FIGURAS_POR_PAGINA)
    .map((figuraJson) => 
    {
      return(
            <div className="contenedorPadreFiguras" key={figuraJson.IdFigura}>
                <div className="columnasDivContenedor" >
                    <h2 className="tituloContenedor">{figuraJson.Nombre}</h2>
                    <h3 className="textoContenedor"> {"Tiene una altura de: "+figuraJson.Altura + " cm"}</h3>
                    <h3 className="textoContenedor"> {"Marca: "+figuraJson.Marca}</h3>
                    <h3 className="textoContenedor"> {"Material: "+figuraJson.Material}</h3>
                </div>
                <div className="columnasDivContenedor">
                  <img className="fotoColumnaContenedor" src={API_IMAGENES + "type="+ figuraJson.TipoFoto +
                  "&"+"path=figuras/" + figuraJson.NombreFoto} alt= {figuraJson.DescripcionFoto}></img>
                </div>
            </div>
      );
    })):
    (
      <h2 className='tituloContenedor'> No se han encontrado figuras </h2>
    )}
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