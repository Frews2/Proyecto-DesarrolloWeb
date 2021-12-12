import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../css/home.css';
import ListaNoticias from '../components/noticias/listaNoticias';


function HomepageHeader() {
  console.log(sessionStorage.getItem('token'));
  return (    
      <div className="hero-image">
        <div className="hero-text">
          <h1>Figure It Out</h1>
          <p>Las ultimas noticias en figuras</p>
        </div>
      </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home">
      <HomepageHeader/>
      <main>
      <h1 className="tituloSolo">Ultimas noticias</h1>
      <div className="contenedorGeneral">
          <ListaNoticias></ListaNoticias>
      </div>
        
      </main>
      
    </Layout>
  );
}
