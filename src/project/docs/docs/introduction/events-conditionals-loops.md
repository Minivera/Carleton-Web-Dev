---
title: "Events, Conditionals & Loops"
---

This guide contains information on how to use attributes to listen to events on HTML elements, how to conditionally
 render elements, and how to use loops ot create multiple elements. If you have used React-like frameworks in the past
 , this section should be very familiar to you.

## Events
When building application, we often want to be able to listen to events on HTML elements. Things like the `onclick
` event of a button or the `onchange` event of an input. For example, we could listen to the click event on a button
 by doing:

```javascript
document.querySelector('button').addEventListener('click', event => {
  // do something
});

// or

document.querySelector('button').onclick = event => {
  // do something
};
```

VirtualDOM instead exposes the ability to listen to event through properties by giving a function. To listen to an
 event, add a property for the name of the even with no capital letters and the `on` prefix - for example, the click
 event would be written `onclick` - and assign a function to it, like this:

```jsx
const Button = () => {
  const onClick = event => {
     // do something
  };

  return <button onclick={onClick}>Click me!</button>
};
```

VirtualDOM does not provide any event system beyond what the DOM provides. Events are hooked directly to their DOM
 equivalents and the `event` object will be the one triggered by the HTML element, not the virtual element.

## Conditionals
Rendering things conditionally can be done with a traditional if or ternary statement. For example, let's imagine we
 want to show a message if an error happens.

```jsx
const ErrorMessage = ({ error }) => {
  return error ? (
    <div class="error">
      {error.message}
    </div>
  ) : null;
};
```

If a component returns a null tree, then that tree will simply be ignored.

How do we handle cases where there are more than two possible choices? An `if` and a variable can be used in those cases
. Let's examine a case where out error object also has a status code embedded.

```jsx
const ErrorMessage = ({ error }) => {
  if (!error) {
    return null;
  }

  let message = null;
  if (error.statusCode >= 400 && error.statusCode < 500) {
    message = (
      <div class="warning">
        {error.message}
      </div>
     );
  } else if (error.statusCode >= 500) {
    message = (
      <div class="danger">
        {error.message}
      </div>
     );
  }

  return message;
};
```

## Loops
The same way conditional are done through traditional JavaScript, loops are also done with `for` loops or array methods.

One common pattern when looking to loop over an array of elements to convert them to components is to use the `map` 
method on the array. For example:

```jsx
const TableRow = ({ cells }) => {
  return (
    <tr>
      {cells.map(cell => (
        <td>{cell}</td>
      ))}
    </tr>
  );
};
```

We could then drop this component into a table and have cells generated automatically for each of our rows. Let's
 explore this with another example. This time, we want to be able to remove rows that are hidden, so we will use a
 for loop rather than a map.

```jsx
const rows = [
  { hidden: false, cells: ['cell1', 'cell2', 'cell3']},
  { hidden: true, cells: ['cell1', 'cell2', 'cell3']},
  { hidden: false, cells: ['cell1', 'cell2', 'cell3']}
];

const Table = () => {
  const rows = [];
  rows.forEach(row => {
    if (row.hidden) {
      return;
    }

    rows.push(
      <TableRow cells={row.cells} />
    ); 
  });

  return (
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};
```
