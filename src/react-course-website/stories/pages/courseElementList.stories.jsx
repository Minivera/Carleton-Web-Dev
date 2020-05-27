import React from 'react';
import { Route } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import { CourseElementList } from '../../layout/courseElementList';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Course element list',
  component: CourseElementList,
  decorators: [StoryRouter(null, { initialEntries: ['/assignments'] })],
};

export const courseElementList = () => (
  <Route path="/:type">
    <CourseElementList user={users[1]} content={initialState} dispatch={() => {}} />
  </Route>
);
