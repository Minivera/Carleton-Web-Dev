/** @jsx h */
import { h } from '../../vdom';
import classNames from 'classnames';

export const TodoItem = ({ todo, model }, { isEditing = false, editTodo = todo.title, setState }) => {
  const setIsEditing = val => setState('isEditing', val);
  const setEditTodo = val => setState('editTodo', val);

  const handleSubmit = () => {
    const val = editTodo.trim();

    if (val) {
      model.editTodo(todo.id, val);
      setIsEditing(false);
    }
  };

  const handleChange = event => {
    setEditTodo(event.target.value);
  };

  const handleStartEditing = () => {
    setEditTodo(todo.title);
    setIsEditing(true);
  };

  const handleKeyDown = event => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    handleSubmit();
  };

  return (
    <li class={classNames({
      completed: todo.completed,
      editing: isEditing
    })}>
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          checked={todo.completed}
          onchange={() => model.toggle(todo.id)}
        />
        <label ondblclick={handleStartEditing}>
          {todo.title}
        </label>
        <button class="destroy" onclick={() => model.removeTodo(todo.id)} />
      </div>
      <input
        class="edit"
        value={editTodo}
        onblur={handleSubmit}
        oninput={handleChange}
        onkeydown={handleKeyDown}
      />
    </li>
  );
};
