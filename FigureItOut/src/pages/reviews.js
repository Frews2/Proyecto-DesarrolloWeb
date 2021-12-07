import React from "react";
import "../css/home.css";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ListaReviews from "../components/reviews/listaReviews";
import BarraBusqueda from "../components/utilidades/barraBusqueda";

function PaginaListaReviews() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Reviews">
    <main>
      <BarraBusqueda></BarraBusqueda>
      <h1 className="tituloSolo">Ultimas reviews </h1>
      <div className="contenedorGeneral">
        <ListaReviews></ListaReviews>
      </div>
    </main>
  </Layout>
  );
}

export default PaginaListaReviews;