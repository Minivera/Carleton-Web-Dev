import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Lecture } from '../../components/lecture';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Single lecture',
  component: Lecture,
  decorators: [withLinks],
};

export const lectureWithStudentUser = () =>
  <Lecture user={users[1]} lecture={initialState.lectures[0]} dispatch={() => {}} />;
export const lectureWithAdminUser = () =>
  <Lecture user={users[0]} lecture={initialState.lectures[0]} dispatch={() => {}} />;
