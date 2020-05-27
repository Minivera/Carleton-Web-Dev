import React from 'react';
import { Link } from 'react-router-dom';

import { Activities } from '../components/activities';
import { Forums } from '../components/forums';
import { CourseContentType, UserType } from '../types/proptypes';

/**
 * Page for displaying a list of forum categories, hosted under the route `/forums/`.
 *
 * Will display the page as two tiles, one with the content and one with the activities sub menu.
 *
 * See also: [Bulma Tiles](https://bulma.io/documentation/layout/tiles/)<br />
 * See also: <a data-sb-kind="Components/Activities menu">Forums list</a><br />
 * See also: <a data-sb-kind="Components/Activities menu">Activities sub menu</a>
 */
export const ForumsPage = ({ content, user }) => (
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
              <li className="is-active"><a>Forums</a></li>
            </ul>
          </nav>
          <Forums forums={content.forums} />
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

ForumsPage.propTypes = {
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
};
