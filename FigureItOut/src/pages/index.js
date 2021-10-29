import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './home.css';
import HomepageFeatures from '../components/HomepageFeatures';


function HomepageHeader() {
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
          <HomepageFeatures></HomepageFeatures>
        
      </main>
      
    </Layout>
  );
}
