import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePowerpoint,
  faFileVideo,
  faFileCode
} from '@fortawesome/free-solid-svg-icons';

import { removeLecture } from '../data/courseContent';
import { LectureType, UserType } from '../types/proptypes';

/**
 * A Bulma panel that describes a specific lecture with its slices, recordings and code files.
 *
 * See also: [Bulma Panel](https://bulma.io/documentation/components/panel/).
 */
export const Lecture = ({ lecture, user, dispatch }) => (
  <nav className="panel is-primary" key={lecture.id}>
    <div className="panel-heading">
      <Link to={`/lectures/${lecture.id}`} className="has-text-white is-capitalized is-family-monospace">
        {lecture.unit}
      </Link>
      {user.role === 'admin' && (
        <div className="is-pulled-right">
          <button className="delete" onClick={() => dispatch({
            type: removeLecture,
            id: lecture.id,
          })}/>
        </div>
      )}
    </div>
    {lecture.slides && lecture.slides.map((slide, index) => (
      <div className="panel-block" key={index}>
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFilePowerpoint} size="sm" />
        </span>
        {slide.title}
      </div>
    ))}
    {lecture.recordings && lecture.recordings.map((recording, index) => (
      <div className="panel-block" key={index}>
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFileVideo} size="sm" />
        </span>
        {recording.title}
      </div>
    ))}
    {lecture.code && lecture.code.map((code, index) => (
      <div className="panel-block" key={index}>
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFileCode} size="sm" />
        </span>
        {code.title}
      </div>
    ))}
  </nav>
);

Lecture.propTypes = {
  /**
   * The lecture to display.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  lecture: LectureType.isRequired,

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
