import React from 'react';
import classNames from 'classnames';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export const Footer = ({ count, completedCount, nowShowing, setNowShowing, clearCompleted }) => {
  const activeTodoWord = count > 0 ? 'items' : 'item';

  let clearButton = null;
  if (completedCount > 0) {
    clearButton = (
      <button
        className="clear-completed"
        onClick={clearCompleted}>
        Clear completed
      </button>
    );
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <a
            onClick={() => setNowShowing(ALL_TODOS)}
            className={classNames({selected: nowShowing === ALL_TODOS})}>
            All
          </a>
        </li>
        {' '}
        <li>
          <a
            onClick={() => setNowShowing(ACTIVE_TODOS)}
            className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
            Active
          </a>
        </li>
        {' '}
        <li>
          <a
            onClick={() => setNowShowing(COMPLETED_TODOS)}
            className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
            Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
};
