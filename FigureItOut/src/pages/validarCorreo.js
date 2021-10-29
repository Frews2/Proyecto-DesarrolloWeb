import React from "react";
import '../css/form.css';
import { VerificacionCorreo } from "../components/login";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PaginaValidarCorreo() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Validar Correo">
    <main>
      <VerificacionCorreo></VerificacionCorreo>
    </main>
  </Layout>
  );
}

export default PaginaValidarCorreo;