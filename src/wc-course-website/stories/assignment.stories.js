import assignments from '../data/assignment-data.json';
import '../components/assignment';

export default {
  title: 'Single assignment',
  component: 'single-assignment',
};

export const Assignment = () => {
  const node = document.createElement('div', { is: 'single-assignment' });
  node.assignment = assignments[0];
  return node;
};
