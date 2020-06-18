import { html } from 'lit-html';
import { component } from 'haunted';
import classNames from 'classnames';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

function Footer({ count, completedCount, nowShowing }) {
  console.log(this);
  const activeTodoWord = count > 0 ? 'items' : 'item';

  const handleClear = () => {
    this.dispatchEvent(new window.CustomEvent('clear', { bubbles: true, composed: true }));
  };

  const handleShowing = showLabel => {
    this.dispatchEvent(new window.CustomEvent('show', { detail: { label: showLabel }, bubbles: true, composed: true }));
  };

  let clearButton = null;
  if (completedCount > 0) {
    clearButton = html`
      <button class="clear-completed" @click=${handleClear}>
        Clear completed
      </button>
    `;
  }

  return html`
    <footer class="footer">
      <span class="todo-count"> <strong>${count}</strong> ${activeTodoWord} left </span>
      <ul class="filters">
        <li>
          <a @click=${() => handleShowing(ALL_TODOS)} class=${classNames({ selected: nowShowing === ALL_TODOS })}>
            All
          </a>
        </li>
        &nbsp
        <li>
          <a @click=${() => handleShowing(ACTIVE_TODOS)} class=${classNames({ selected: nowShowing === ACTIVE_TODOS })}>
            Active
          </a>
        </li>
        &nbsp
        <li>
          <a
            @click=${() => handleShowing(COMPLETED_TODOS)}
            class=${classNames({ selected: nowShowing === COMPLETED_TODOS })}
          >
            Completed
          </a>
        </li>
      </ul>
      ${clearButton}
    </footer>
  `;
}

Footer.observedAttributes = ['count', 'completedCount', 'nowShowing'];

window.customElements.define('todo-footer', component(Footer, { useShadowDOM: false }));
