import React from 'react';
import ReactDOM from 'react-dom';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import { App } from './components/app';

ReactDOM.render(
  <App />,
  document.querySelector('.todoapp')
);
