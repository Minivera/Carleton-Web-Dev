import React from 'react';

import { App } from '../../components/app';

import notes from './app.notes.md';

export default {
  title: 'Components/Complete application',
  component: App,
  parameters: {
    notes: { markdown: notes },
  }
};

export const application = () => <App />;
