import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Assignments } from '../../components/assignments';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Assignments',
  component: Assignments,
  decorators: [withLinks],
};

export const assignments = () => (
  <Assignments user={users[1]} assignments={initialState.assignments} dispatch={() => {}} />
);
