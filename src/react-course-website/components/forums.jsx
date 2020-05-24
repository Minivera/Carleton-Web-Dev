import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { CollapsibleContent } from './collapsibleContent';

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
