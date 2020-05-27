import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { Lectures } from '../components/lectures';
import { Tutorials } from '../components/tutorials';
import { Assignments } from '../components/assignments';
import { Activities } from '../components/activities';
import { CourseContentType, UserType } from '../types/proptypes';

/**
 * Generic page for displaying a list of course elements, hosted under the route `/:type/`.
 *
 * The _:type_ parameter in the route should be one of `lecture|tutorials|assignments` and will decide which
 * element is to be displayed.
 *
 * If none of those parameters are valid, it will redirect to the home page.
 *
 * Will display the page as two tiles, one with the content and one with the activities sub menu.
 *
 * See also: [Bulma Tiles](https://bulma.io/documentation/layout/tiles/)<br />
 * See also: <a data-sb-kind="Components/Activities menu">Activities sub menu</a>
 */
export const CourseElementList = ({ content, user, dispatch }) => {
  const { type } = useParams();

  let name = '';
  let component = null;
  // Select the component to render based on the type given in route parameters.
  switch (type) {
    case 'lectures':
      name = 'Lectures';
      component = <Lectures lectures={content.lectures} user={user} dispatch={dispatch} />;
      break;
    case 'tutorials':
      name = 'Tutorials';
      component = <Tutorials tutorials={content.tutorials} user={user} dispatch={dispatch} />;
      break;
    case 'assignments':
      name = 'Assignments';
      component = <Assignments assignments={content.assignments} user={user} dispatch={dispatch} />;
      break;
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
                <li className="is-active"><a>{name}</a></li>
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

CourseElementList.propTypes = {
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
