import React from "react";
import "../css/home.css";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ListaFiguras from '../components/figuras/ListaFiguras';
import BarraBusqueda from "../components/utilidades/barraBusqueda";

function PaginaListaFiguras() {
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