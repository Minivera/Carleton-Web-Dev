import '../components/collapsibleMenu';

export default {
  title: 'Collapsible menu',
  component: 'collapsible-menu',
};

export const WithContent = () => {
  return `
    <ul>
      <collapsible-menu title="Some title">
        I am hidden!
      </collapsible-menu>
    </ul>
  `;
};
