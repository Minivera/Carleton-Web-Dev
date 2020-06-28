import '../components/contentCount';

export default {
  title: 'Content counter',
  component: 'content-count',
};

export const LecturesCounter = () => {
  const el = document.createElement('content-count');
  el.setAttribute('source', 'lectures');
  return el;
};
