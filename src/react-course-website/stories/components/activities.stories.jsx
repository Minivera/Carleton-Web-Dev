import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Activities } from '../../components/activities';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Activities menu',
  component: Activities,
  decorators: [withLinks],
};

export const activitiesWithStudentUser = () => <Activities user={users[1]} content={initialState} />;
export const activitiesWithAdminUser = () => <Activities user={users[0]} content={initialState} />;
