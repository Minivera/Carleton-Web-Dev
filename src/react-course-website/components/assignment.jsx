import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faFile
} from '@fortawesome/free-solid-svg-icons';

import { removeAssignment } from '../data/courseContent';
import { AssignmentType, UserType } from '../types/proptypes';

/**
 * A Bulma panel that describes a specific assignment with its specification file and resources.
 *
 * See also: [Bulma Panel](https://bulma.io/documentation/components/panel/).
 */
export const Assignment = ({ assignment, user, dispatch }) => (
  <nav className="panel is-success" key={assignment.id}>
    <div className="panel-heading">
      <Link to={`/assignments/${assignment.id}`} className="has-text-white is-capitalized is-family-monospace">
        {assignment.name}
      </Link>
      {user.role === 'admin' && (
        <div className="is-pulled-right">
          <button className="delete" onClick={() => dispatch({
            type: removeAssignment,
            id: assignment.id,
          })}/>
        </div>
      )}
    </div>
    {assignment.specfile && (
      <div className="panel-block">
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFilePdf} size="sm" />
        </span>
        {assignment.specfile.title}
      </div>
    )}
    {assignment.resources && assignment.resources.map((resource, index) => (
      <div className="panel-block" key={index}>
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFile} size="sm" />
        </span>
        {resource.title}
      </div>
    ))}
  </nav>
);

Assignment.propTypes = {
  /**
   * The assignment to display.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  assignment: AssignmentType.isRequired,

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
