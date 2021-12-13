import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


import '../../css/estiloForm.css';
import { CrearNoticia } from "../../components/noticias/crearNoticia.js";

function PaginaSubirNoticia() 
{
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