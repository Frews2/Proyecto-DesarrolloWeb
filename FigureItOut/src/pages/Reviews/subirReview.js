import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import '../../css/estiloForm.css';
import { CrearReview } from "../../components/reviews/crearReview.js";

function PaginaSubirReview()
{
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