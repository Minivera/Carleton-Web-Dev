import '../components/assignments';
import '../components/assignment';

export default {
  title: 'Assignments list',
  component: 'assignments-list',
};

export const CompleteList = () => {
  return document.createElement('assignments-list');
};
