import React, { useState } from 'react';
import classNames from 'classnames';

export const TodoItem = ({ todo, model }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState('');

  const handleSubmit = () => {
    const val = editTodo.trim();

    if (val) {
      model.editTodo(todo.id, val);
      setEditTodo('');
      setIsEditing(false);
    }
  };

  const handleChange = event => {
    setEditTodo(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    handleSubmit();
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: isEditing
    })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => model.toggle(todo.id)}
        />
        <label onDoubleClick={() => setIsEditing(true)}>
          {todo.title}
        </label>
        <button className="destroy" onClick={() => model.removeTodo(todo.id)} />
      </div>
      <input
        className="edit"
        value={editTodo}
        onBlur={handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};
