import React from 'react';
import { Link } from 'react-router-dom';

import { Assignments } from '../components/assignments';
import { Activities } from '../components/activities';

export const AssignmentsPage = ({ content, user, dispatch }) => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile is-parent">
          <article className="tile is-child">
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><a>Home</a></li>
                <li>
                  <Link to="/">COMP2406</Link>
                </li>
                <li className="is-active"><a>Assignments</a></li>
              </ul>
            </nav>
            <Assignments assignments={content.assignments} user={user} dispatch={dispatch} />
          </article>
        </div>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box">
          <p className="title">Activities</p>
          <p className="subtitle">Quick access to class activities</p>
          <Activities user={user} content={content} />
        </article>
      </div>
    </div>
  );
};
