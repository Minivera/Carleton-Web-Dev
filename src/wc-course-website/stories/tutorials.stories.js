import '../components/tutorials';
import '../components/tutorial';

export default {
  title: 'Tutorials list',
  component: 'tutorials-list',
};

export const CompleteList = () => {
  return document.createElement('tutorials-list');
};
