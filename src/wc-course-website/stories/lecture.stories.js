import lectures from '../data/lecture-data.json';
import '../components/lecture';

export default {
  title: 'Single lecture',
  component: 'single-lecture',
};

export const Lecture = () => {
  const node = document.createElement('div', { is: 'single-lecture' });
  node.lecture = lectures[0];
  return node;
};
