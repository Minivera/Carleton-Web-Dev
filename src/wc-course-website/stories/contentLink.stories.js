import '../components/contentLink';

export default {
  title: 'Content link',
  component: 'content-link',
};

export const Lecture1Link = () => {
  const el = document.createElement('content-link');
  el.setAttribute('source', 'lectures');
  el.setAttribute('element-id', 1);
  el.innerHTML = 'This is a link';
  return el;
};
