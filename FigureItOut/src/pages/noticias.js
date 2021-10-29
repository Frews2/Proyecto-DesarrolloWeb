import React from "react";
import "./home.css"
import { Registro } from "../components/login";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Noticias from '../components/noticias';

function PaginaNoticias() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Noticias">
    <main>
      <div className="contenedorNoticias">
        <Noticias></Noticias>
      </div>
    </main>
  </Layout>
  );
}

export default PaginaNoticias;