import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import '../../css/home.css';
import { PerfilPeriodista } from "../../components/sesion/perfilPeriodista.js";

function InicioPeriodista() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Bienvenido">
      <main>
        <PerfilPeriodista></PerfilPeriodista>
      </main>
    </Layout>
  
  );
}

export default InicioPeriodista;