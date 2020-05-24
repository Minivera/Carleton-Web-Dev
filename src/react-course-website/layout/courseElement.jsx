import React from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

import { Activities } from '../components/activities';
import { Tutorial } from '../components/tutorial';
import { Lecture } from '../components/lecture';
import { Assignment } from '../components/assignment';

export const CourseElement = ({ content, user, dispatch }) => {
  const { type, id } = useParams();

  let name = '';
  let title = null;
  let component = null;
  switch (type) {
    case 'lectures': {
      const lecture = content.lectures.find(el => `${el.id}` === id);

      if (!lecture) {
        return <Redirect to="/" />;
      }

      name = 'Lectures';
      title = lecture.unit;
      component = <Lecture lecture={lecture} user={user} dispatch={dispatch} />;
      break;
    }
    case 'tutorials': {
      const tutorial = content.tutorials.find(el => `${el.id}` === id);

      if (!tutorial) {
        return <Redirect to="/" />;
      }

      name = 'Tutorials';
      title = tutorial.name;
      component = <Tutorial tutorial={tutorial} user={user} dispatch={dispatch} />;
      break;
    }
    case 'assignments': {
      const assignment = content.assignments.find(el => `${el.id}` === id);

      if (!assignment) {
        return <Redirect to="/" />;
      }

      name = 'Assignments';
      title = assignment.name;
      component = <Assignment assignment={assignment} user={user} dispatch={dispatch} />;
      break;
    }
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
                <li>
                  <Link to={`/${type}`}>{name}</Link>
                </li>
                <li className="is-active"><a>{title}</a></li>
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
