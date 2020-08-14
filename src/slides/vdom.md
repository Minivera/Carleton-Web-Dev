---
class: center, middle, inverse

# The virtual DOM and React

---
class: center

React was not the first frontend framework, nor will it be the last. It also was not the first to try to solve the
 issues devs had with working with the DOM. Predecessors like Ember.js or backbone.js paved the way to improving the
  developer experience on the frontend.

But React was the first framework to implement a whole new pattern for creating web applications, the Virtual DOM.

The Virtual DOM was a game changer, and we're still discovering more uses today. If you are studying UI frameworks in
 2020, you cannot move three feet without encountering a Virtual DOM powered framework.

According to the [2020 state of frontend survey](https://tsh.io/state-of-frontend/#frameworks), React is still very
 widely used and that was what guided us to study it first.

---

layout: false
.left-column[
  ## What is the virtual DOM?
]
.right-column[
  The virtual DOM, as the name implies, is a virtual version of the DOM. It mirrors the DOM structure of a web pages
   using common JavaScript objects. This allows developers to manipulate the DOM without having to go through the DOM
    API.
   
  Framework creators can use this newfound power to create complex frameworks that provide a familiar experience to
   the developer, while still allowing them to manipulate the DOM freely.
  
  Developers can now focus on creating testable and maintainable code while the framework takes care of all the DOM
   operations.
]

---

layout: false
.left-column[
  ## What is the virtual DOM?
]
.right-column[
  The Virtual DOM, in the simplest of terms, can be described as a function of state.

  VDOM frameworks provide mechanisms to detect state changes in the virtual tree, which is then processed by the
   framework to find what has changed. The changes are finally applied to the DOM tree so both trees keep matching,
    and the UI has been updated.
  
  .image.center[![VDOM](https://i1.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png?resize=1024
  %2C685
  &ssl=1)]
]

---

layout: false
.left-column[
  ## What is the virtual DOM?
  ## How does React do this?
]
.right-column[
  React implements their virtual DOM through the use of components. Components are pieces of code that produce a
   virtual tree. When React detects a change in the state, it asks the component to rerender, and computes the
    difference between the tree before and after the rerender, or diff. The diff is applied to the DOM to keep both
     up to date.
  
  ```javascript
// A component is often a function in React, it should return a virtual tree of nodes.
const Component = (props) => {
  const { someState } = props;
  // Render something different depending on state, React will take care of updating the DOM
  // by calling this component again when the state changes.
  if (someState) {
    return 'foo';
  }
  return 'bar';
};
  ```
]

---

layout: false
.left-column[
  ## What is the virtual DOM?
  ## How does React do this?
  ## HTML in JavaScript?!
]
.right-column[
  Returning strings is nice and all, but we want to return a structure that can be transformed into DOM nodes.
  
  To do this, React provides us with a new expanded subset of JavaScript called JSX. JSX allows us to write HTML-like
   code directly into our component. React will automatically transform that structure into a Virtual DOM tree for us.
  
  ```jsx
const Component = ({ someState }) => {
  if (someState) {
    return (
      <div>
        <span>By having it between brackets, you can execute any JavaScript code you want.</span>
        <code>{someState}</code>
      </div>
    );
  }
  return (
    <div>
      JSX is still JavaScript at the end of the day, so things like {'this'}
      {['are', 'possible'].join(' ')}.
    </div>
  );
};
  ```
]

---

layout: false
.left-column[
  ## What is the virtual DOM?
  ## How does React do this?
  ## HTML in JavaScript?!
]
.right-column[
  By creating multiple components, we can use JSX to compose components together, creating complex applications.
  
  ```jsx
const Message = ({ message }) => {
  return (
    <h1>
      {message}
    </h1>
  );
};

const App = () => {
  // We can pass attributes to components, which are then available in the props parameter
  return (
    <Message message="Hello, World!" />
  );
};
  ```
]

---

layout: false
.left-column[
  ## What is the virtual DOM?
  ## How does React do this?
  ## HTML in JavaScript?!
  ## And so much more
]
.right-column[
  React provides us with many more tools. For example, we can use hooks, small functions that store state directly
   into the React framework, to make our application more dynamic. The `useState` hook can be used to
    store state, to name only one.
  
  ReactDOM is the tool used to render React components in the DOM, but its companion, React Native, can be used to
   render JavaScript React components as native applications on mobile devices.
  
  ReactRouter can be used to listen to changes in the URL and render different pages accordingly without ever
   refreshing the page, making the experience truly seamless.
  
  We could fill an entire talk only talking about React, you can start reading more here after the presentation
  : https://github.com/Minivera/carleton-web-dev/tree/master/src/react-course-website.
]
