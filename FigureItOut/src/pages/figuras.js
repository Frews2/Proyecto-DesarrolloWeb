import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import "../css/home.css";
import ListaFiguras from '../components/figuras/ListaFiguras.js';
import BarraBusqueda from "../components/utilidades/barraBusqueda.js";

function PaginaListaFiguras()
{
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Lista de Figuras">
    <main>
      <BarraBusqueda></BarraBusqueda>
      <h1 className="tituloSolo">Lista de Figuras guardadas</h1>

      <div className="contenedorGeneral">
        <ListaFiguras></ListaFiguras>
      </div>
      
    </main>
  </Layout>
  );
}

export default PaginaListaFiguras;