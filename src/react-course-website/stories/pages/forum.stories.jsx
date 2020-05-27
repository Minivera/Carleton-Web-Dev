import React from 'react';
import { Route } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import { ForumPage } from '../../layout/forum';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Forum category',
  component: ForumPage,
  decorators: [StoryRouter(null, { initialEntries: ['/forums/1'] })],
};

export const forumPage = () => (
  <Route path="/forums/:id">
    <ForumPage user={users[1]} content={initialState} dispatch={() => {}} />
  </Route>
);
