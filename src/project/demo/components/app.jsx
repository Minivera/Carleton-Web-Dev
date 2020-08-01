/** @jsx h */
import { h } from '../../vdom';

import { Footer } from './footer';
import { TodoItem } from './todoItem';
import useTodoModel from '../model/todoModel';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export const App = (_, { todos = [], newTodo = '', nowShowing = ALL_TODOS, setState }) => {
  const setNowShowing = val => setState('nowShowing', val);
  const setNewTodo = val => setState('newTodo', val);
  const setTodos = val => setState('todos', val);
  const model = useTodoModel(todos, setTodos);

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

  const allTodos = model.all();
  const shownTodos = allTodos.filter(todo => {
    switch (nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodoCount = allTodos.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0);

  const completedCount = allTodos.length - activeTodoCount;

  return (
    <div>
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onkeydown={handleNewTodoKeyDown}
          oninput={handleChange}
          autoFocus={true}
        />
      </header>
      {todos.length ? (
        <section class="main">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            onchange={() => model.toggleAll(activeTodoCount !== 0)}
            checked={activeTodoCount === 0}
          />
          <label
            htmlFor="toggle-all"
          />
          <ul class="todo-list">
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
