import React from "react";
import '../css/figureItOutStyle.css';
import { Registro } from "../components/login";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PaginaRegistro() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Registrate">
    <main>
      <Registro></Registro>
    </main>
  </Layout>
  );
}

export default PaginaRegistro;