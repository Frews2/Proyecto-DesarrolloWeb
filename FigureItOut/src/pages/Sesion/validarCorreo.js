import React from "react";
import '../../css/estiloForm.css';
import { VerificacionCorreo } from "../../components/sesion";
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