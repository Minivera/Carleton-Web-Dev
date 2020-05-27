import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import { ForumTopicPage } from '../../layout/forumTopic';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Forum topic',
  component: ForumTopicPage,
  decorators: [StoryRouter(null, { initialEntries: ['/forums/0/topics/0'] })],
};

const state = {
  ...initialState,
  forums: [
    {
      id: 0,
      title: 'Announcements',
      topics: [
        {
          id: 0,
          title: 'Lorem Ipsum',
          comments: [
            {
              id: 0,
              user: 'admin',
              /* eslint-disable max-len */
              content: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              `,
              /* eslint-enable max-len */
            }
          ],
        },
      ],
    },
  ],
};

export const forumTopic = () => (
  <Route path="/forums/:id/topics/:topicId">
    <ForumTopicPage user={users[1]} content={state} dispatch={() => {}} />
  </Route>
);
