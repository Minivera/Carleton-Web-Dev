import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Forums } from '../../components/forums';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Forums',
  component: Forums,
  decorators: [withLinks],
};

export const assignments = () => (
  <Forums forums={initialState.forums} />
);
