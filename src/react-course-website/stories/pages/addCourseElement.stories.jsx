import React from 'react';
import { Route } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import { AddCourseElement } from '../../layout/addCourseElement';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Add course element modal',
  component: AddCourseElement,
  decorators: [StoryRouter(null, { initialEntries: ['/assignments/+'] })],
};

export const addCourseElement = () => (
  <Route path="/:type/+">
    <AddCourseElement content={initialState} dispatch={() => {}} />
  </Route>
);
