import React from 'react';
import { Route } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import { CourseElement } from '../../layout/courseElement';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Single course element',
  component: CourseElement,
  decorators: [StoryRouter(null, { initialEntries: ['/assignments/0'] })],
};

export const courseElement = () => (
  <Route path="/:type/:id">
    <CourseElement user={users[1]} content={initialState} dispatch={() => {}} />
  </Route>
);
