import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faFile
} from '@fortawesome/free-solid-svg-icons';

import { removeTutorial } from '../data/courseContent';
import { TutorialType, UserType } from '../types/proptypes';

/**
 * A Bulma panel that describes a specific tutorial with its specification file and resources.
 *
 * See also: [Bulma Panel](https://bulma.io/documentation/components/panel/).
 */
export const Tutorial = ({ tutorial, user, dispatch }) => (
  <nav className="panel is-info" key={tutorial.id}>
    <div className="panel-heading">
      <Link to={`/tutorials/${tutorial.id}`} className="has-text-white is-capitalized is-family-monospace">
        {tutorial.name}
      </Link>
      {user.role === 'admin' && (
        <div className="is-pulled-right">
          <button className="delete" onClick={() => dispatch({
            type: removeTutorial,
            id: tutorial.id,
          })}/>
        </div>
      )}
    </div>
    {tutorial.specfile && (
      <div className="panel-block">
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFilePdf} size="sm" />
        </span>
        {tutorial.specfile.title}
      </div>
    )}
    {tutorial.resources && tutorial.resources.map((resource, index) => (
      <div className="panel-block" key={index}>
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFile} size="sm" />
        </span>
        {resource.title}
      </div>
    ))}
  </nav>
);

Tutorial.propTypes = {
  /**
   * The tutorial to display.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  tutorial: TutorialType.isRequired,

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
