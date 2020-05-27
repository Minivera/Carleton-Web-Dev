import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { loginUser } from '../data/users';

/**
 * Login page to be used when the user is not logged in the application.
 *
 * While considered a page, this page is loaded like a normal component under any url if the user is not logged
 * in. It will allow the user to log in the application using the users defined in the users store.
 *
 * See the <a data-sb-kind="Pages/Logged-in page">LoggedIn</a> component documentation for more details on the
 * user store.
 */
export const Login = ({ handleLogin }) => {
  // We create some state to store the username the user enters and shows some loading/error state
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    // Sets the loading state to true before starting the promise.
    setLoading(true);

    // Using promises here as async functions were bugging out the build
    loginUser(username).then(user => {
      setLoading(false);
      handleLogin(user);
    }).catch(reason => {
      // This will trigger if an error is thrown in the promise.
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

Login.propTypes = {
  /**
   * Function that is to be called when the user clicks on the submit button. Excepts a user object to log
   * that user inside of the state.
   * @param {Object} user - User to log into the application. Should be fetched from the user store.
   */
  handleLogin: PropTypes.func.isRequired,
};
