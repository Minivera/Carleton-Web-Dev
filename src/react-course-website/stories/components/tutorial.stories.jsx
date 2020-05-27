import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Tutorial } from '../../components/tutorial';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Single tutorial',
  component: Tutorial,
  decorators: [withLinks],
};

export const tutorialWithStudentUser = () =>
  <Tutorial user={users[1]} tutorial={initialState.tutorials[0]} dispatch={() => {}} />;
export const tutorialWithAdminUser = () =>
  <Tutorial user={users[0]} tutorial={initialState.tutorials[0]} dispatch={() => {}} />;
