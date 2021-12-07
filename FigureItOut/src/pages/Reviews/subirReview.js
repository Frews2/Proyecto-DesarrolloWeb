import React from "react";
import '../../css/estiloForm.css';
import { CrearReview } from "../../components/reviews/crearReview";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PaginaSubirReview() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Sube tu review">
    <main>
      <CrearReview></CrearReview>
    </main>
  </Layout>
  );
}

export default PaginaSubirReview;