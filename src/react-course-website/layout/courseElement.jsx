import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useParams } from 'react-router-dom';

import { Activities } from '../components/activities';
import { Tutorial } from '../components/tutorial';
import { Lecture } from '../components/lecture';
import { Assignment } from '../components/assignment';
import { CourseContentType, UserType } from '../types/proptypes';

/**
 * Generic page for displaying a single course element, hosted under the route `/:type/:id`.
 *
 * The _:type_ parameter in the route should be one of `lecture|tutorials|assignments` and will decide which
 * element is to be displayed.
 *
 * The _:id_ parameter in the route should be a number and will make the application fetch the given
 * element inside the course content.
 *
 * If none of those parameters are valid, it will redirect to the home page.
 *
 * Will display the page as two tiles, one with the content and one with the activities sub menu.
 *
 * See also: [Bulma Tiles](https://bulma.io/documentation/layout/tiles/)<br />
 * See also: <a data-sb-kind="Components/Activities menu">Activities sub menu</a>
 */
export const CourseElement = ({ content, user, dispatch }) => {
  const { type, id } = useParams();

  let name = '';
  let title = null;
  let component = null;
  // select the type and id from the parameters to generate the component on the fly.
  switch (type) {
    case 'lectures': {
      const lecture = content.lectures.find(el => `${el.id}` === id);

      if (!lecture) {
        return <Redirect to="/" />;
      }

      name = 'Lectures';
      title = lecture.unit;
      component = <Lecture lecture={lecture} user={user} dispatch={dispatch} />;
      break;
    }
    case 'tutorials': {
      const tutorial = content.tutorials.find(el => `${el.id}` === id);

      if (!tutorial) {
        return <Redirect to="/" />;
      }

      name = 'Tutorials';
      title = tutorial.name;
      component = <Tutorial tutorial={tutorial} user={user} dispatch={dispatch} />;
      break;
    }
    case 'assignments': {
      const assignment = content.assignments.find(el => `${el.id}` === id);

      if (!assignment) {
        return <Redirect to="/" />;
      }

      name = 'Assignments';
      title = assignment.name;
      component = <Assignment assignment={assignment} user={user} dispatch={dispatch} />;
      break;
    }
  }

  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile is-parent">
          <article className="tile is-child">
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><a>Home</a></li>
                <li>
                  <Link to="/">COMP2406</Link>
                </li>
                <li>
                  <Link to={`/${type}`}>{name}</Link>
                </li>
                <li className="is-active"><a>{title}</a></li>
              </ul>
            </nav>
            {component}
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

CourseElement.propTypes = {
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
