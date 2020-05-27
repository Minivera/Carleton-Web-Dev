import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Tutorials } from '../../components/tutorials';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Tutorials',
  component: Tutorials,
  decorators: [withLinks],
};

export const tutorials = () => (
  <Tutorials user={users[1]} tutorials={initialState.tutorials} dispatch={() => {}} />
);
