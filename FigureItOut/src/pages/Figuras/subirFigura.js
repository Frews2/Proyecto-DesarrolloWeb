import React from "react";
import '../../css/estiloForm.css';
import { SubirFigura } from "../../components/figuras/crearFigura";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PaginaSubirFigura() {
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