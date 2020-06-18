import { html } from 'lit-html';
import { component, useState } from 'haunted';
import classNames from 'classnames';

function TodoItem({ todo, model }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = event => {
    const val = event.target.value.trim();

    if (val) {
      model.editTodo(todo.id, val);
      event.target.value = '';
      setIsEditing(false);
    }
  };

  const handleKeyDown = event => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    handleSubmit(event);
  };

  return html`
    <li
      class=${classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div class="view">
        <input class="toggle" type="checkbox" ?checked=${todo.completed} @change=${() => model.toggle(todo.id)} />
        <label @dblclick=${() => setIsEditing(true)}>
          ${todo.title}
        </label>
        <button class="destroy" @click=${() => model.removeTodo(todo.id)} />
      </div>
      <input class="edit" @blur=${handleSubmit} @keydown=${handleKeyDown} />
    </li>
  `;
}

TodoItem.observedAttributes = ['todo', 'model'];

window.customElements.define('todo-item', component(TodoItem, { useShadowDOM: false }));
