import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


import '../../css/estiloForm.css';
import { SubirFigura } from "../../components/figuras/crearFigura.js";

function PaginaSubirFigura() 
{
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Sube la figura">
    <main>
      <SubirFigura></SubirFigura>
    </main>
  </Layout>
  );
}

export default PaginaSubirFigura;