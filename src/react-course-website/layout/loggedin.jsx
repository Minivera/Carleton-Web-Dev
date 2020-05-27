import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Home } from './home';
import { CourseElementList } from './courseElementList';
import { CourseElement } from './courseElement';
import { AddCourseElement } from './addCourseElement';
import { ForumsPage } from './forums';
import { ForumPage } from './forum';
import { ForumTopicPage } from './forumTopic';
import { CourseContentType, UserType } from '../types/proptypes';

/**
 * Main component for the logged-in application. When a user is set into the App state, this component
 * will be loaded and will provide routing capabilities to the rest of the application.
 *
 * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details on the
 * user and content state.
 *
 * See also: [React-router](https://reacttraining.com/react-router/web/guides/quick-start).
 */
export const Loggedin = ({ user, content, dispatch, handleLogout }) => (
  <Router>
    <Header user={user} handleLogout={handleLogout} content={content} />
    <section className="section">
      <div className="container">
        <Switch>
          <Route path="/forums/:id/topics/:topicId">
            <ForumTopicPage content={content} user={user} dispatch={dispatch} />
          </Route>
          <Route path="/forums/:id">
            <ForumPage content={content} user={user} dispatch={dispatch} />
          </Route>
          <Route path="/forums">
            <ForumsPage content={content} user={user} />
          </Route>
          <Route path="/:type/+">
            {user.role === 'admin' ? (
              <Fragment>
                <AddCourseElement content={content} dispatch={dispatch} />
                <CourseElementList content={content} user={user} dispatch={dispatch} />
              </Fragment>
            ) : (
              <div>
                UNAUTHORIZED
              </div>
            )}
          </Route>
          <Route path="/:type/:id">
            <CourseElement content={content} user={user} dispatch={dispatch} />
          </Route>
          <Route path="/:type">
            <CourseElementList content={content} user={user} dispatch={dispatch} />
          </Route>
          <Route path="/">
            <Home content={content} user={user} dispatch={dispatch} />
          </Route>
        </Switch>
      </div>
    </section>
    <Footer />
  </Router>
);

Loggedin.propTypes = {
  /**
   * The user currently logged into the application.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  user: UserType.isRequired,

  /**
   * The course content available on the website.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  content: CourseContentType.isRequired,

  /**
   * The dispatch function to send events to the state machine.
   *
   * See the course content documentation for more details.
   */
  dispatch: PropTypes.func.isRequired,

  /**
   * Function that will be called when a User wants to log out.
   */
  handleLogout: PropTypes.func.isRequired,
};
