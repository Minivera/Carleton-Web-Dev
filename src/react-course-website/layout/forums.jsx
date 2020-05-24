import React from 'react';
import { Link } from 'react-router-dom';

import { Activities } from '../components/activities';
import { Forums } from '../components/forums';

export const ForumsPage = ({ content, user }) => (
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
              <li className="is-active"><a>Forums</a></li>
            </ul>
          </nav>
          <Forums forums={content.forums} />
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
