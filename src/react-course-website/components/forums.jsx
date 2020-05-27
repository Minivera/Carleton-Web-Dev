import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { CollapsibleContent } from './collapsibleContent';
import { ForumType } from '../types/proptypes';

/**
 * A list of forum categories inside of a collapsible content. Forums are shown in their own page.
 *
 * See also: <a data-sb-kind="Components/Collapsible content">Collapsible content component</a>
 */
export const Forums = ({ forums }) => (
  <CollapsibleContent title="Discussion boards">
    {forums.map(forum => (
      <div key={forum.id}>
        <div>
          <span className="icon is-medium">
            <FontAwesomeIcon icon={faComments} size="sm" />
          </span>
          <Link to={`/forums/${forum.id}`} className="is-capitalized">
            {forum.title} - {forum.topics.length} topics
          </Link>
        </div>
        <hr />
      </div>
    ))}
  </CollapsibleContent>
);

Forums.propTypes = {
  /**
   * The forums to display.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  forums: PropTypes.arrayOf(ForumType).isRequired,
};
