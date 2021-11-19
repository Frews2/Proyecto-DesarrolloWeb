import React from "react";
import "./home.css"
import { Registro } from "../components/login";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Noticias from '../components/noticias/noticias';

function PaginaNoticias() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Noticias">
    <main>
      <h1 className="tituloSolo">Ultimas noticias</h1>
      <div className="contenedorNoticias">
        <Noticias></Noticias>
      </div>
    </main>
  </Layout>
  );
}

export default PaginaNoticias;