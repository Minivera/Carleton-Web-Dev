import '../components/contentName';

export default {
  title: 'Content name',
  component: 'content-name',
};

export const Lecture1Name = () => {
  const el = document.createElement('content-name');
  el.setAttribute('source', 'lectures');
  el.setAttribute('element-id', 1);
  return el;
};
