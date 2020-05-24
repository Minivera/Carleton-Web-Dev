import React, { Fragment } from 'react';
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
