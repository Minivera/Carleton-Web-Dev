import React, { useState, useReducer } from 'react';

import { Login } from '../layout/login';
import { Loggedin } from '../layout/loggedin';
import { initialState, reducer } from '../data/courseContent';

export const App = () => {
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = user => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return user === null ? (
    <Login handleLogin={handleLogin} />
  ) : (
    <Loggedin user={user} handleLogout={handleLogout} content={state} dispatch={dispatch} />
  );
};
