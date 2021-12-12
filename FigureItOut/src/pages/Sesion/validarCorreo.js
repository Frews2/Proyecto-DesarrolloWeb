import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import '../../css/estiloForm.css';
import { VerificacionCorreo } from "../../components/sesion/verificacionCorreo.js";
import { ContadorCorreo } from "../../components/utilidades/contadorCorreo.js";

function PaginaValidarCorreo() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Validar Correo">
    <main>
      <VerificacionCorreo></VerificacionCorreo>
      <ContadorCorreo></ContadorCorreo>
    </main>
  </Layout>
  );
}

export default PaginaValidarCorreo;