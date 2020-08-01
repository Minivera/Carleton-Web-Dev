/** @jsx h */
import { VirtualDOM } from '../vdom';

import { App } from './components/app';

/* const App = ({ time = new Date() }, { setState }) => {
  window.setTimeout(() => setState('time', new Date()), 1000);

  return (
    <div>
      <h1>The current time is:</h1>
      {time.toLocaleTimeString('en-US')}
    </div>
  );
  // const timeString = time.toLocaleTimeString('en-US');
  // return h('div', {}, h('h1', {}, 'The current time is: '), h('span', {}, timeString));
}; */

new VirtualDOM(App).renderInto(document.querySelector('.todoapp'));
