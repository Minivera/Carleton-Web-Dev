---
title: "Recipes: Render property or function"
---

A common pattern with frontend framework is passing a function as a property or as the children of a component to
 render things dynamically front a child. This is perfectly possible with VirtualDOM. The code will be very
 familiar to you if you ever used a render prop in React.

Let's see how we manage render properties first:

```jsx
const Child = ({ content }) => (
  <div>
    {content("Hello, World!")}
  </div>
);

const Parent = () => (
  <div>
    <Child 
      content={message => <span>{message}</span>}
    />
  </div>
);
```

By executing the property, we can get the content it's intended to render. This pattern is very useful when we want
 to render content based on the state of a child component.

Render props are very useful as a pattern, but the overall JSX structure can often look nicer when using a render
 function as the only child instead. Let's see the same example, but using this method instead.

```jsx
const Child = ({ children }) => (
  <div>
    {children("Hello, World!")}
  </div>
);

const Parent = () => (
  <div>
    <Child>
      {message => <span>{message}</span>}
    </Child>
  </div>
);
```
