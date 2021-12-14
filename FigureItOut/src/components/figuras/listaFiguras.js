import React,{ useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import {BsArrowLeft,BsArrowRight} from "react-icons/bs";

const FIGURAS_POR_PAGINA = 5;
const API_LINK="https://figure-it-out-uv.herokuapp.com/";
const API_IMAGENES = API_LINK+"imagenes/Ver?";


export default function ListaFiguras()
{
  const [figuras, setFiguras] = useState([]);
  const [numeroPagina, setNumeroPagina] = useState(0);
  const paginasVisitadas = numeroPagina * FIGURAS_POR_PAGINA;

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
          enlaceBusqueda= API_LINK+"figuras/buscar?filtro="+filtroBusqueda;
        }
        else
        {
          enlaceBusqueda= API_LINK+"figuras/buscar";
        }
      return enlaceBusqueda;
    }
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
    if(typeof window !== "undefined")
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
        setFiguras(json.resultado);
      };
      fetchData();
  }}, [setFiguras]);

  const contadorPagina = figuras === null?0:Math.ceil(figuras.length / FIGURAS_POR_PAGINA);
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
                  <img className="fotoColumnaContenedor" src={API_IMAGENES + "direccion=figuras/"+ figuraJson.NombreFoto +
                      "&tipo=" + figuraJson.TipoFoto} alt= {figuraJson.DescripcionFoto}></img>
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
        containerClassName={"paginationBttns"} previousLinkClassName={"paginacionBoton"}
        nextLinkClassName={"paginacionBoton"} disabledClassName={"paginacionDesabilitada"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}