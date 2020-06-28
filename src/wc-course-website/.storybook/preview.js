import { configure, setCustomElements } from '@storybook/web-components';

import 'bulma/css/bulma.css';
import customElements from '../custom-elements.json';

// Add all the templates we have into the body of the previewer
import activities from '../components/activities/index.html';
import assignment from '../components/assignment/index.html';
import assignments from '../components/assignments/index.html';
import collapsibleContent from '../components/collapsibleContent/index.html';
import collapsibleMenu from '../components/collapsibleMenu/index.html';
import forums from '../components/forums/index.html';
import forumTopic from '../components/forumTopic/index.html';
import forumTopics from '../components/forumTopics/index.html';
import lecture from '../components/lecture/index.html';
import lectures from '../components/lectures/index.html';
import navbar from '../components/navbar/index.html';
import tutorial from '../components/tutorial/index.html';
import tutorials from '../components/tutorials/index.html';
[
  activities,
  assignment,
  assignments,
  collapsibleContent,
  collapsibleMenu,
  forums,
  forumTopic,
  forumTopics,
  lecture,
  lectures,
  navbar,
  tutorial,
  tutorials,
].forEach(template => {
  const templater = document.createElement('div');
  templater.innerHTML = template;

  templater.querySelectorAll('template').forEach(template => {
    document.querySelector('body').prepend(template);
  });
});

setCustomElements(customElements);

// force full reload to not re-register web components
const req = require.context('../stories', true, /\.stories\.(js|mdx)$/);

configure(req, module);

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}
