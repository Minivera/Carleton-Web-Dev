import React from 'react';
import { Link } from 'react-router-dom';

import { Tutorials } from '../components/tutorials';
import { Activities } from '../components/activities';

export const TutorialsPage = ({ content, user, dispatch }) => {
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
                <li className="is-active"><a>Tutorials</a></li>
              </ul>
            </nav>
            <Tutorials tutorials={content.tutorials} user={user} dispatch={dispatch} />
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
