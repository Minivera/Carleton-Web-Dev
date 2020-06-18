import { useState } from 'haunted';

let currentId = 0;

export default () => {
  const [todos, setTodos] = useState([]);

  return {
    addTodo(title) {
      currentId++;

      setTodos([].concat(todos, { id: currentId, title, completed: false }));
    },

    editTodo(id, newTitle) {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)));
    },

    removeTodo(id) {
      setTodos(todos.filter(todo => todo.id !== id));
    },

    all() {
      return [...todos];
    },

    toggleAll(checked = true) {
      setTodos(todos.map(todo => ({ ...todo, completed: checked })));
    },

    toggle(id) {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    },
  };
};
