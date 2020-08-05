module.exports = {
  title: 'Project documentation',
  tagline: 'Documentation for the directed studies project',
  url: 'https://minivera.github.io',
  baseUrl: '/carleton-web-dev/project/docs/',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'throw',
  projectName: 'carleton-web-dev', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Project documentation',
      items: [
        {
          label: 'Getting Started',
          to: 'introduction/getting-started',
          position: 'left'
        },
        {
          label: 'Context',
          to: 'context/overview',
          position: 'left'
        },
        {
          label: 'Recipes',
          to: 'recipes/recipe-index',
          position: 'left'
        },
        {
          href: 'https://github.com/Minivera/carleton-web-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Minivera/carleton-web-dev',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Guillaume St-Pierre. Built with Docusaurus.`,
    },
  },
  themes: [
    '@docusaurus/theme-classic'
  ],
  plugins: [
    ['@docusaurus/plugin-content-docs', {
      routeBasePath: '/',
      homePageId: 'introduction/virtual-dom',
      sidebarPath: require.resolve('./sidebars.js'),
    }],
    // '@docusaurus/plugin-content-pages',
    '@docusaurus/plugin-sitemap',
  ],
};
