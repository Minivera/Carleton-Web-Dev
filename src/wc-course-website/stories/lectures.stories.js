import '../components/lectures';
import '../components/lecture';

export default {
  title: 'Lectures list',
  component: 'lectures-list',
};

export const CompleteList = () => {
  return document.createElement('lectures-list');
};
