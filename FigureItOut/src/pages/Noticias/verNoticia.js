import React from "react";
import '../../css/estiloForm.css';
import '../../css/estiloListaPublicacion.css';
import VistaNoticia from "../../components/noticias/vistaNoticia";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PaginaVerNoticia() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Sube tu noticia">
    <main>
      <VistaNoticia></VistaNoticia>
    </main>
  </Layout>
  );
}

export default PaginaVerNoticia;