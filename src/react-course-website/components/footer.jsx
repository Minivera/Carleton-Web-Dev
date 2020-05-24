import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <div className="columns">
        <div className="column">
          <Link to="/lectures">
            Lectures
          </Link>
        </div>
        <div className="column">
          <Link to="/tutorials">
            Tutorials
          </Link>
        </div>
        <div className="column">
          <Link to="/assignments">
            Assignments
          </Link>
        </div>
        <div className="column">
          <Link to="/forums">
            Discussion boards
          </Link>
        </div>
      </div>
      <p>
        Built with <strong>Bulma</strong>.
      </p>
    </div>
  </footer>
);
