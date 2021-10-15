import React from "react";
import '../css/form.css';
import { Register } from "../components/login";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function RegisterPage() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Registrate">
    <main>
      <Register></Register>
    </main>
  </Layout>
  );
}

export default RegisterPage;