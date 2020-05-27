import React from 'react';

import { Home } from '../../layout/home';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Home',
  component: Home
};

export const homePage = () => <Home user={users[1]} content={initialState} dispatch={() => {}} />;
