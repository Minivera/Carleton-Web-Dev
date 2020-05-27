import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Lectures } from '../../components/lectures';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Lectures',
  component: Lectures,
  decorators: [withLinks],
};

export const lectures = () => (
  <Lectures user={users[1]} lectures={initialState.lectures} dispatch={() => {}} />
);
