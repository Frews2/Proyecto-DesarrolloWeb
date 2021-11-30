import React from "react";
import "./home.css"
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ListaReviews from "../components/reviews/listaReviews";

function PaginaListaReviews() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Reviews">
    <main>
      <h1 className="tituloSolo">Ultimas reviews agregadas</h1>
      <div className="contenedorGeneral">
        <ListaReviews></ListaReviews>
      </div>
    </main>
  </Layout>
  );
}

export default PaginaListaReviews;