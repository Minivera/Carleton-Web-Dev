import React from 'react';
import { withLinks } from '@storybook/addon-links';

import { Header } from '../../components/header';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [withLinks],
};

export const headerWithStudentUser = () => <Header user={users[1]} content={initialState} handleLogout={() => {}} />;
export const headerWithAdminUser = () => <Header user={users[0]} content={initialState} handleLogout={() => {}} />;
