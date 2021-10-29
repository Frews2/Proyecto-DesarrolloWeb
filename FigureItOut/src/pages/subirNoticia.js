import React from "react";
import '../css/form.css';
import { CrearNoticia } from "../components/crearNoticia";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PaginaSubirNoticia() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Sube tu noticia">
    <main>
      <CrearNoticia></CrearNoticia>
    </main>
  </Layout>
  );
}

export default PaginaSubirNoticia;