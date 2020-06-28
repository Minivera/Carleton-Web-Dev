import '../components/collapsibleContent';

export default {
  title: 'Collapsible content',
  component: 'collapsible-content',
};

export const WithContent = () => {
  return `
    <collapsible-content title="Some title">
      I am visible!
    </collapsible-content>
  `;
};
