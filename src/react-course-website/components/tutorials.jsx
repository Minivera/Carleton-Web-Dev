import React from 'react';
import PropTypes from 'prop-types';

import { CollapsibleContent } from './collapsibleContent';
import { Tutorial } from './tutorial';
import { TutorialType, UserType } from '../types/proptypes';

/**
 * A list of tutorials inside of a collapsible content.
 *
 * See also: <a data-sb-kind="Components/Single tutorial">Single tutorial component</a><br />
 * See also: <a data-sb-kind="Components/Collapsible content">Collapsible content component</a>
 */
export const Tutorials = ({ tutorials, user, dispatch }) => (
  <CollapsibleContent title="Tutorials">
    {tutorials.map(tutorial => (
      <Tutorial key={tutorial.id} tutorial={tutorial} user={user} dispatch={dispatch} />
    ))}
  </CollapsibleContent>
);

Tutorials.propTypes = {
  /**
   * The tutorials to display.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  tutorials: PropTypes.arrayOf(TutorialType).isRequired,

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
