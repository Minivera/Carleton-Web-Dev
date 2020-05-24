import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { loginUser } from '../data/users';

export const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setLoading(true);

    // Using promises here as async functions were bugging out the build
    loginUser(username).then(user => {
      setLoading(false);
      handleLogin(user);
    }).catch(reason => {
      setLoading(false);
      setError(reason.message);
    });
  };

  return (
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <div className="box">
              <h3 className="title has-text-black">Login</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black">Please login to proceed.</p>
              {error !== null && (
                <div className="notification is-danger">
                  <button className="delete" onClick={() => setError(null)}/>
                  {error}
                </div>
              )}
              <div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-large"
                      type="email"
                      placeholder="Your Email"
                      autoFocus=""
                      value={username}
                      onChange={event => setUsername(event.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input className="input is-large" type="password" placeholder="Your Password" />
                  </div>
                </div>
                <button
                  className={`button is-info is-large is-fullwidth${loading ? ' is-loading' : ''}`}
                  onClick={handleSubmit}
                >
                  <span>Login</span>
                  <span className="icon is-medium">
                    <FontAwesomeIcon icon={faSignInAlt} size="sm" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
