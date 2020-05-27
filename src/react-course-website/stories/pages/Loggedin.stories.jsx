import React from 'react';

import { Loggedin } from '../../layout/loggedin';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Logged-in component',
  component: Loggedin
};

export const loggedInPage = () => (
  <Loggedin
    user={users[0]}
    content={initialState}
    dispatch={() => {}}
    handleLogout={() => {}}
  />
);
