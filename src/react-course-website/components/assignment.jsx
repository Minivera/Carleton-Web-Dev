import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faFile
} from '@fortawesome/free-solid-svg-icons';

import { removeAssignment } from '../data/courseContent';

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
