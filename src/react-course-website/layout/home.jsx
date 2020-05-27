import React from 'react';
import PropTypes from 'prop-types';

import { Lectures } from '../components/lectures';
import { Tutorials } from '../components/tutorials';
import { Assignments } from '../components/assignments';
import { Activities } from '../components/activities';
import { Forums } from '../components/forums';
import { CourseContentType, UserType } from '../types/proptypes';

/**
 * Home page of the application hosted under `/`.
 *
 * This page displays all of the list components to show all the available content inside of the course. It uses
 * a suite of bulma components to make the page look great.
 *
 * See also: [Bulma](https://bulma.io/documentation)<br />
 * See also: <a data-sb-kind="Components/Header">Header component</a><br />
 * See also: <a data-sb-kind="Components/Lectures">Lectures list</a><br />
 * See also: <a data-sb-kind="Components/Tutorials">Tutorials list</a><br />
 * See also: <a data-sb-kind="Components/Assignments">Assignments list</a><br />
 * See also: <a data-sb-kind="Components/Forums">Forums categories</a><br />
 * See also: <a data-sb-kind="Components/Footer">Footer component</a><br />
 * See also: <a data-sb-kind="Components/Activities menu">Activities sub menu</a>
 */
export const Home = ({ content, user, dispatch }) => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <article className="tile is-vertical notification is-primary" style={{ paddingTop: 40, paddingBottom: 40 }}>
              <h1 className="title">Welcome to COMP2406</h1>
              <h2 className="subtitle">
                The course covers the principles involved in the design and implementation of web applications.
                Our primary programming language in this offering will be Javascript (on both client and server
                side). The course will examine programming concepts as they relate to building web applications
                and will emphasize the computer science fundamentals.
              </h2>
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child">
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><a>Home</a></li>
                <li className="is-active"><a>COMP2406</a></li>
              </ul>
            </nav>
            <h1 className="title">COMP2406 - Fundamentals of Web Applications</h1>
            <div className="content">
              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Lectures</p>
                    <p className="title">{content.lectures.length}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Tutorials</p>
                    <p className="title">{content.tutorials.length}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Assignments</p>
                    <p className="title">{content.assignments.length}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Forum topics</p>
                    <p className="title">
                      {content.forums.reduce((accumulator, forum) => accumulator + forum.topics.length, 0)}
                    </p>
                  </div>
                </div>
              </nav>
              <hr />
              <h2>Topics Covered</h2>
              <p>
                Here is a list of the main topics covered:
              </p>
              <ul>
                <li>Web Concepts, HTTP</li>
                <li>Javascript</li>
                <li>Markup Languages (HTML, CSS)</li>
                <li>Client and Server side coding (in javascript)</li>
                <li>Javascript execution environments: Browser, Node.js, and Express.js</li>
                <li>Node.js and NPM</li>
                <li>Functional Programming and Closures</li>
                <li>Synchronous and Asynchronous programming</li>
                <li>JSON databases (using MongoDB)</li>
                <li>Server side templating (using Pug)</li>
                <li>Sessions, Cookies, Ajax, and Web Sockets</li>
              </ul>
              <Lectures lectures={content.lectures} user={user} dispatch={dispatch} />
              <Tutorials tutorials={content.tutorials} user={user} dispatch={dispatch} />
              <Assignments assignments={content.assignments} user={user} dispatch={dispatch} />
              <Forums forums={content.forums} />
            </div>
          </article>
        </div>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box">
          <p className="title">Activities</p>
          <p className="subtitle">Quick access to class activities</p>
          <Activities user={user} content={content} />
        </article>
      </div>
    </div>
  );
};

Home.propTypes = {
  /**
   * The course content inside the application.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  content: CourseContentType.isRequired,

  /**
   * The user currently logged into the application.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  user: UserType.isRequired,

  /**
   * The dispatch function to send events to the state machine.
   *
   * See the course content documentation for more details.
   */
  dispatch: PropTypes.func.isRequired,
};
