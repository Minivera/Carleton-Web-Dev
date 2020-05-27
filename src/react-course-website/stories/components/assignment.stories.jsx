import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Assignment } from '../../components/assignment';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Single assignment',
  component: Assignment,
  decorators: [withLinks],
};

export const assignmentWithStudentUser = () =>
  <Assignment user={users[1]} assignment={initialState.assignments[0]} dispatch={() => {}} />;
export const assignmentWithAdminUser = () =>
  <Assignment user={users[0]} assignment={initialState.assignments[0]} dispatch={() => {}} />;
