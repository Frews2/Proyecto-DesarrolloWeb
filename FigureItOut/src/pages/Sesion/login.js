import React from "react";
import '../../css/estiloForm.css';
import { Login } from "../../components/sesion";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function LoginPage() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Inicia Sesion">
      <main>
        <Login></Login>
      </main>
    </Layout>
  
  );
}

export default LoginPage;