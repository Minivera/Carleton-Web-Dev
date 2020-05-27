import React from 'react';

import { ForumsPage } from '../../layout/forums';
import { users } from '../../data/users';
import { initialState } from '../../data/courseContent';

export default {
  title: 'Pages/Forum categories',
  component: ForumsPage
};

export const forumsPage = () => <ForumsPage user={users[1]} content={initialState} dispatch={() => {}} />;
