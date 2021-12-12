import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import '../../css/home.css';
import { PerfilColeccionista } from "../../components/sesion/perfilColeccionista";

function InicioColeccionista() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Bienvenido">
      <main>
        <PerfilColeccionista></PerfilColeccionista>
      </main>
    </Layout>
  
  );
}

export default InicioColeccionista;