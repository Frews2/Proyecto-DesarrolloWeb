import React from "react";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


import '../../css/estiloForm.css';
import '../../css/estiloListaPublicacion.css';
import  VistaNoticia  from "../../components/noticias/vistaNoticia.js";
import { CrearComentario } from "../../components/utilidades/crearComentario.js";
import { CrearReporte } from "../../components/utilidades/crearReporte.js";

function PaginaVerNoticia() 
{
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Revisa la noticia">
    <main>
      <CrearReporte tipo={"Noticia"}></CrearReporte>
      <VistaNoticia></VistaNoticia>
      <CrearComentario></CrearComentario>
    </main>
  </Layout>
  );
}

export default PaginaVerNoticia;