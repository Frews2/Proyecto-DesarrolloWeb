import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import '../../css/estiloForm.css';
import '../../css/estiloListaPublicacion.css';
import VistaReview from "../../components/reviews/vistaReview.js";
import { CrearComentario } from "../../components/utilidades/crearComentario.js";
import { CrearReporte } from "../../components/utilidades/crearReporte.js";

function PaginaVerReview()
{
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Revisa la review">
    <main>
      <CrearReporte tipo={"Review"}></CrearReporte>
      <VistaReview></VistaReview>
      <CrearComentario></CrearComentario>
    </main>
  </Layout>
  );
}

export default PaginaVerReview;