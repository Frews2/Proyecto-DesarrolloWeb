import React from "react";
import "../css/home.css";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ListaNoticias from '../components/noticias/listaNoticias';
import BarraBusqueda from "../components/utilidades/barraBusqueda";

function PaginaNoticias() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Noticias">
    <main>
      <BarraBusqueda></BarraBusqueda>
      <h1 className="tituloSolo">Ultimas noticias</h1>
      <div className="contenedorGeneral">
        <ListaNoticias></ListaNoticias>
      </div>
    </main>
  </Layout>
  );
}

export default PaginaNoticias;