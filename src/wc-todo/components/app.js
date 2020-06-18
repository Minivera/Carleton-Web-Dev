import { html } from 'lit-html';
import { component, useState } from 'haunted';

import useTodoModel from '../model/todoModel';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

function App() {
  const [nowShowing, setNowShowing] = useState(ALL_TODOS);
  const model = useTodoModel();

  const handleShow = event => {
    setNowShowing(event.detail.label);
  };

  const handleNewTodoKeyDown = event => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    const val = event.target.value.trim();

    if (val) {
      model.addTodo(val);
      event.target.value = '';
    }
  };

  const todos = model.all();
  const shownTodos = todos.filter(todo => {
    switch (nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodoCount = todos.reduce((accum, todo) => (todo.completed ? accum : accum + 1), 0);

  const completedCount = todos.length - activeTodoCount;

  return html`
    <div>
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" @keydown=${handleNewTodoKeyDown} autofocus />
      </header>
      ${todos.length
        ? html`
            <section class="main">
              <input
                id="toggle-all"
                class="toggle-all"
                type="checkbox"
                @change=${() => model.toggleAll(activeTodoCount !== 0)}
                ?checked="${activeTodoCount === 0}"
              />
              <label for="toggle-all"></label>
              <ul class="todo-list">
                ${shownTodos.map(todo => html`<todo-item .todo=${todo} .model=${model} />`)}
              </ul>
            </section>
          `
        : null}
      ${activeTodoCount || completedCount
        ? html`
            <todo-footer
              .count=${activeTodoCount}
              .completedCount=${completedCount}
              .nowShowing=${nowShowing}
              @show=${handleShow}
              @clear=${() => model.toggleAll(false)}
            />
          `
        : null}
    </div>
  `;
}

window.customElements.define('todo-app', component(App, { useShadowDOM: false }));
