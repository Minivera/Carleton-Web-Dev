import React from 'react';
import PropTypes from 'prop-types';

import { CollapsibleContent } from './collapsibleContent';
import { Lecture } from './lecture';
import { LectureType, UserType } from '../types/proptypes';

/**
 * A list of lectures inside of a collapsible content.
 *
 * See also: <a data-sb-kind="Components/Single lecture">Single lecture component</a><br />
 * See also: <a data-sb-kind="Components/Collapsible content">Collapsible content component</a>
 */
export const Lectures = ({ lectures, user, dispatch }) => (
  <CollapsibleContent title="Lectures">
    {lectures.map(lecture => (
      <Lecture key={lecture.id} lecture={lecture} user={user} dispatch={dispatch} />
    ))}
  </CollapsibleContent>
);

Lectures.propTypes = {
  /**
   * The assignments to display.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  lectures: PropTypes.arrayOf(LectureType).isRequired,

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
