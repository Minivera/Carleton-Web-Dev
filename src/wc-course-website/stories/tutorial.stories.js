import tutorials from '../data/tutorial-data.json';
import '../components/tutorial';

export default {
  title: 'Single tutorial',
  component: 'single-tutorial',
};

export const Tutorial = () => {
  const node = document.createElement('div', { is: 'single-tutorial' });
  node.tutorial = tutorials[0];
  return node;
};
