import React from "react";
import '../../css/estiloForm.css';
import '../../css/estiloListaPublicacion.css';
import VistaReview from "../../components/reviews/vistaReview";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PaginaVerReview() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Revisa la review">
    <main>
      <VistaReview></VistaReview>
    </main>
  </Layout>
  );
}

export default PaginaVerReview;