---
title: Creating applications
---

So far, we have seen how to create single components. Let's now explore how to use all those resources to create a
 TODO manager.

Let's first start by creating an HTML file for our application. It can contain anything, but for the purposes of this
 guide, copy this content into it.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Todo List</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./index.jsx"></script>
  </body>
</html>
```

We will create our entire application using VirtualDOM and thus, we only include our script file, and an element in
 which we will add our application. Let's do that right now by creating the `index.jsx` file in the same location as
 the html file.

```jsx
/** @jsx h */
import { VirtualDOM, h } from 'VirtualDOM';

const defaultTodos = [
  'Create application',
  'Write unit tests',
  'Write docs'
];

const App = () => {
  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {defaultTodos.map(todo => <li>{todo}</li>)}
      </ul>
    </div>
  );
};

new VirtualDOM(App).renderInto(document.querySelector('#app'));
```

This will render a small list of static todos onto the screen. Let's start adding the ability to add todos to our
 application. Go back to `index.jsx`'s `App` component and change it to the following code.

```jsx
/** @jsx h */
import { VirtualDOM, h } from 'VirtualDOM';

const defaultTodos = [
  'Create application',
  'Write unit tests',
  'Write docs'
];

const App = (_, { todos = defaultTodo, setState }) => {
  const addTodo = value => setState('todos', [...todos, value]);

  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {todos.map(todo => <li>{todo}</li>)}
      </ul>
    </div>
  );
};

new VirtualDOM(App).renderInto(document.querySelector('#app'));
```

We added a second parameter for the component's context to access the `todos` property, with our previous todos as
 the default value, and the `setState` method to update the state when necessary. We then create a function that will
 add the given function when we want to add a new todo. However, we still need a component for adding said todo, let
 's do that right now.

```jsx
const AddTodo = ({ addTodo }, { newTodo = '', setState }) => {
  return (
    <div>
        <input type="text" value={newTodo} oninput={event => setState('newTodo', event.target.value)} />
        <button onclick={() => addTodo(newTodo)}>Create</button>
    </div>
  );
};
```

This component will render an input and manage its state for the new todo value, only calling the `addTodo` when the
 button is clicked, passing along the value of `newTodo`. Component in VirtualDOM are completely isolated from one
 another and in complex applications, this means that updating the state of `AddTodo` would not cause any updates on its
 parents.

We can add this new component to the structure of our previous component and have a todo list with the capacity to
 add new todos.

```jsx
const App = (_, { todos = defaultTodo, setState }) => {
  const addTodo = value => setState('todos', [...todos, value]);

  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {todos.map(todo => <li>{todo}</li>)}
      </ul>
      <AddTodo addTodo={addTodo} />
    </div>
  );
};
```

With that, we have an application. While it is a simple one, we can see how these patterns can be expanded to build
 anything our hearts desire. In the next section, you will see how these familiar patterns can be expanded with the
use of the component context.
