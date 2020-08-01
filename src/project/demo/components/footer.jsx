/** @jsx h */
import { h } from '../../vdom';
import classNames from 'classnames';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export const Footer = ({ count, completedCount, nowShowing, setNowShowing, clearCompleted }) => {
  const activeTodoWord = count > 1 ? 'items' : 'item';

  let clearButton = null;
  if (completedCount > 0) {
    clearButton = (
      <button
        class="clear-completed"
        onclick={clearCompleted}>
        Clear completed
      </button>
    );
  }

  return (
    <footer class="footer">
      <span class="todo-count">
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul class="filters">
        <li>
          <a
            onclick={() => setNowShowing(ALL_TODOS)}
            class={classNames({ selected: nowShowing === ALL_TODOS })}>
            All
          </a>
        </li>
        {' '}
        <li>
          <a
            onclick={() => setNowShowing(ACTIVE_TODOS)}
            class={classNames({ selected: nowShowing === ACTIVE_TODOS })}>
            Active
          </a>
        </li>
        {' '}
        <li>
          <a
            onclick={() => setNowShowing(COMPLETED_TODOS)}
            class={classNames({ selected: nowShowing === COMPLETED_TODOS })}>
            Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
};
