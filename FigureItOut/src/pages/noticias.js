import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import "../css/home.css";
import ListaNoticias from '../components/noticias/listaNoticias.js';
import BarraBusqueda from "../components/utilidades/barraBusqueda.js";

function PaginaNoticias()
{
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