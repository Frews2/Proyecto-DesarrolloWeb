import React from "react";
import '../css/form.css';
import { Login } from "../components/login";
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