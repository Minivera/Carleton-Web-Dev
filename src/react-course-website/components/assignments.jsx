import React from 'react';
import PropTypes from 'prop-types';

import { CollapsibleContent } from './collapsibleContent';
import { Assignment } from './assignment';
import { AssignmentType, UserType } from '../types/proptypes';

/**
 * A list of assignments inside of a collapsible content.
 *
 * See also: <a data-sb-kind="Components/Single assignment">Single assignment component</a><br />
 * See also: <a data-sb-kind="Components/Collapsible content">Collapsible content component</a>
 */
export const Assignments = ({ assignments, user, dispatch }) => (
  <CollapsibleContent title="Assignments">
    {assignments.map(assignment => (
      <Assignment key={assignment.id} assignment={assignment} user={user} dispatch={dispatch} />
    ))}
  </CollapsibleContent>
);

Assignments.propTypes = {
  /**
   * The assignments to display.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  assignments: PropTypes.arrayOf(AssignmentType).isRequired,

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
