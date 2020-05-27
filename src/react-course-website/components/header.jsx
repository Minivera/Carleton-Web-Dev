import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFlask, faLaptopHouse, faPlus, faComments } from '@fortawesome/free-solid-svg-icons';

import { CourseContentType, UserType } from '../types/proptypes';

/**
 * This component display a styled header using the bulma navbar component.
 *
 * The Header will display more commands if the user is identified as an admin user.
 *
 * See also: [Bulma Navbar](https://bulma.io/documentation/components/navbar/).
 */
export const Header = ({ user, content, handleLogout }) => (
  <header>
    <nav className="navbar has-shadow is-light" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbar" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to="/lectures">
                <span className="icon has-text-primary">
                  <FontAwesomeIcon icon={faBook} size="sm" />
                </span>
                <span>Lectures</span>
              </Link>
              <div className="navbar-dropdown">
                {content.lectures.map(lecture => (
                  <Link key={lecture.id} className="navbar-item" to={`/lectures/${lecture.id}`}>
                    {lecture.unit}
                  </Link>
                ))}
                {user.role === 'admin' && (
                  <Fragment>
                    <hr className="navbar-divider" />
                    <Link className="navbar-item" to="/lectures/+">
                      <span className="icon">
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </span>
                      <span>Add a new lecture</span>
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to="/tutorials">
                <span className="icon has-text-info">
                  <FontAwesomeIcon icon={faFlask} size="sm" />
                </span>
                <span>Tutorials</span>
              </Link>
              <div className="navbar-dropdown">
                {content.tutorials.map(tutorial => (
                  <Link key={tutorial.id} className="navbar-item" to={`/tutorials/${tutorial.id}`}>
                    {tutorial.name}
                  </Link>
                ))}
                {user.role === 'admin' && (
                  <Fragment>
                    <hr className="navbar-divider" />
                    <Link className="navbar-item" to="/tutorials/+">
                      <span className="icon">
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </span>
                      <span>Add a new tutorial</span>
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to="/assignments">
                <span className="icon has-text-success">
                  <FontAwesomeIcon icon={faLaptopHouse} size="sm" />
                </span>
                <span>Assignments</span>
              </Link>
              <div className="navbar-dropdown">
                {content.assignments.map(assignment => (
                  <Link key={assignment.id} className="navbar-item" to={`/assignments/${assignment.id}`}>
                    {assignment.name}
                  </Link>
                ))}
                {user.role === 'admin' && (
                  <Fragment>
                    <hr className="navbar-divider" />
                    <Link className="navbar-item" to="/assignments/+">
                      <span className="icon">
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </span>
                      <span>Add a new assignment</span>
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to="/forums">
                <span className="icon has-text-danger">
                  <FontAwesomeIcon icon={faComments} size="sm" />
                </span>
                <span>Forums</span>
              </Link>
              <div className="navbar-dropdown">
                {content.forums.map(forum => (
                  <Link key={forum.id} className="navbar-item" to={`/forums/${forum.id}`}>
                    {forum.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-item">
                <button className="button navbar-link is-link is-inverted is-outlined">
                  {user.name}
                </button>
              </span>
              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={handleLogout}>
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
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
   * Function that will be called when a User wants to log out.
   */
  handleLogout: PropTypes.func.isRequired,
};
