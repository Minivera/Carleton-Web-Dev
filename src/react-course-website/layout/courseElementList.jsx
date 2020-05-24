import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Lectures } from '../components/lectures';
import { Tutorials } from '../components/tutorials';
import { Assignments } from '../components/assignments';
import { Activities } from '../components/activities';

export const CourseElementList = ({ content, user, dispatch }) => {
  const { type } = useParams();

  let name = '';
  let component = null;
  switch (type) {
    case 'lectures':
      name = 'Lectures';
      component = <Lectures lectures={content.lectures} user={user} dispatch={dispatch} />;
      break;
    case 'tutorials':
      name = 'Tutorials';
      component = <Tutorials tutorials={content.tutorials} user={user} dispatch={dispatch} />;
      break;
    case 'assignments':
      name = 'Assignments';
      component = <Assignments assignments={content.assignments} user={user} dispatch={dispatch} />;
      break;
  }

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
                <li className="is-active"><a>{name}</a></li>
              </ul>
            </nav>
            {component}
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
