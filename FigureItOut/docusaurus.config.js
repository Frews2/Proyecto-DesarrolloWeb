
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = 
{
  title: 'Figure It Out',
  tagline: 'Las ultimas noticias de figuras',
  url: 'https://FigureItOut.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'FigureItOut', 
  projectName: 'docusaurus', 

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    ({
      navbar: {
        title: 'Figure It Out',
        items: [
          
          {
            to: '/Sesion/login', 
            label: 'Perfil', 
            position: 'left'
          },
          {
            to: '/noticias', 
            label: 'Noticias', 
            position: 'left'
          },
          {
            to: '/reviews', 
            label: 'Reviews', 
            position: 'left'
          },
          {
            to: '/figuras', 
            label: 'Figuras', 
            position: 'left'
          },
        ],
      },
      footer: {
        style: 'dark',
        
        copyright: `Copyright © ${new Date().getFullYear()} Figure It Out, Inc. Construido con Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
