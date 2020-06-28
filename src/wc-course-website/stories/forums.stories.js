import '../components/forums';

export default {
  title: 'Forums list',
  component: 'forums-list',
};

export const CompleteList = () => {
  return document.createElement('forums-list');
};
