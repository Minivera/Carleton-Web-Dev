---
title: Getting started
---

To get started with VirtualDOM, you will need to install it through your package manager of choice and bundle your
 application with any bundler. VirtualDOM does not use any JavaScript that cannot be processed by modern browsers, but
 bundling and transpiling is likely to be necessary if you want to support older browsers or mobile devices.

## Installation
Would be filled if the library was uploaded to NPM.

## Your first component
To create a component, you need to first add a node in your HTML file for VirtualDOM to render the component into
. Any node will do, and it can safely be added to an existing application if you only need small parts of the
 application to be managed by the framework. For this guide, we will be using a `<div id="app"></div>` tag.

VirtualDOM only exposes ESM compatible modules, and you will need to create and load a JavaScript file for the
 framework to be used. This can be handled through your bundler, but you can also create an ESM-compatible file by
 importing it into HTML with the `<script type="module" src="index.js"></script>` tag.

Add the following code to the JavaScript file to create a basic clock and load it into the DOM.

```javascript
import { VirtualDOM, h } from 'VirtualDOM';

const Clock = (_, { time = new Date(), setState }) => {
  window.setTimeout(() => setState('time', new Date()), 1000);

  const timeString = time.toLocaleTimeString('en-US');
  return h('div', {}, h('h1', {}, 'The current time is: '), h('span', {}, timeString));
};

new VirtualDOM(Clock).renderInto(document.querySelector('#app'));
```

`App` is our component. It takes two parameters, the properties given to this component when it is created and the
 component's context. By default, the context only contains the `setState` and `requestUpdate` functions. When we
 call the `setState`, a new property will be added to the context under the key given in the first parameter. This
 new attribute can then be use in subsequent renders. In this specific example, we give a default value to the `time
 ` property of the component context by giving the variable a default value when deconstructing. When the state
 updates and stores teh value, the default value will be ignored.

The `h` function is our node creator. This function takes a tag, which can either be a string, or a function as we
'll see later. The second parameter are the properties for this element, things like event listeners or the `class
`. HTML elements will have those properties added to the node. Note that contrary to frameworks like React, VirtualDOM
 uses the word `class` instead of `className` and provides no styling solution. The next parameter(s) are the
 children of the node.

Here, we want to render a structure looking like this:

```html
<div>
  <h1>The current time is:</h1>
  <span><!-- time as a string is inserted here --></span>
</div>
```

Finally, we take this component and create a new VirtualDOM instance from it. That instance can be kept in memory or
 used as-is. The `renderInto` method on the `VirtualDOM` will add the custom element to our `#app` div and kickstart
 the render process.
 
## JSX
VirtualDOM supports JSX out of the box, allowing you to write components in a more familiar and readable format. With
 JSX enabled, the above example would instead look like this:

```jsx
/** @jsx h */
import { VirtualDOM, h } from 'VirtualDOM';

const Clock = (_, { time = new Date(), setState }) => {
  window.setTimeout(() => setState('time', new Date()), 1000);

  const timeString = time.toLocaleTimeString('en-US');
  return (
    <div>
      <h1>The current time is:</h1>
      <span>{timeString}</span>
    </div>
  );
};

new VirtualDOM(Clock).renderInto(document.querySelector('#app'));
```

All that's needed to activate JSX is to prepend `/** @jsx h */` to all files using the JSX format. Make sure to
 always import the `h` function from `VirtualDOM`;

The rest of this documentation will assume that you are using JSX.

## Advanced components and creating applications
The next part of this introduction goes over advanced component topics like events and conditionals, followed by how
 to compose components into applications.
