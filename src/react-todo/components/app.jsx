import React, { useState } from 'react';

import { Footer } from './footer';
import { TodoItem } from './todoItem';
import useTodoModel from '../model/todoModel';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export const App = () => {
  const [nowShowing, setNowShowing] = useState(ALL_TODOS);
  const [newTodo, setNewTodo] = useState('');
  const model = useTodoModel();

  const handleChange = event => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoKeyDown = event => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    const val = newTodo.trim();

    if (val) {
      model.addTodo(val);
      setNewTodo('');
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

  const activeTodoCount = todos.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0);

  const completedCount = todos.length - activeTodoCount;

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onKeyDown={handleNewTodoKeyDown}
          onChange={handleChange}
          autoFocus={true}
        />
      </header>
      {todos.length ? (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={model.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label
            htmlFor="toggle-all"
          />
          <ul className="todo-list">
            {shownTodos.map(todo => <TodoItem key={todo.id} todo={todo} model={model} />)}
          </ul>
        </section>
      ) : null}
      {(activeTodoCount || completedCount) ? (
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={nowShowing}
          setNowShowing={setNowShowing}
          clearCompleted={() => model.toggleAll(false)}
        />
      ) : null}
    </div>
  );
};
