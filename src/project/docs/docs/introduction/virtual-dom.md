---
title: Library overview
---

This library, temporarily named VirtualDOM, is yet-another-frontend-framework for creating single-page applications
. VirtualDOM stands out from the crowd by focusing on portability, extensibility and simplicity. The framework
 provides the strict minimum for modern building web applications with components while giving the developer the
 ability to very easily hack into the framework and add any pattern they can imagine.

## Motivations
VirtualDOM was created as part of a directed study at Carleton university. The goal was to study technologies for
 creating web applications, namely the virtual DOM pattern, web components, and Web Assembly. The final goal of this
 course was to create a complete UI framework that attempts to solve some of the issues that plague many frameworks.

After studying the algorithms and inner-workings of a dozen frameworks - plus reading the documentation of over
 thirty - I compiled a description of the render algorithms, and a list of objectives I wanted to achieve with this
 library. There were two things that stood out to me when studying all those frameworks: they mostly all were very
 hard to debug without the use of specific tools, and many existed within their own ecosystem. The most popular
 libraries also all seemed to limit themselves by diffing their entire virtual tree on every update. While I have yet
 to find proof this patterns hurts performance in anything but massive applications, it has a noticeable impact on
 memory usage from all those recursive functions.

My objective with this library was to offer a potential solution to the issues I identified. I hope to bring some
 ideas to the table, or at least my version of the solutions if they already exist within the community.

### Easy to debug
A web application should not be a black box that can only be explored using chrome-only extensions or advanced tools
. One should be able to look at the DOM structure and extract the information they need from it.

To that end, VirtualDOM adds its components directly in the DOM structure as custom elements. Each element has
 properties and methods to manage their own virtual tree (the tree of Virtual DOM nodes) and that tree stops when it
 hits another component. Using the function available in vanilla JavaScript, a developer can very easily access that
 tree and trigger updates or state changes. Consider this DOM structure:
 
```html
<!-- This is the custom element created by the library. -->
<vdom-component>
  <div>
    <h1>Hello, World!</h1>
  </div>
</vdom-component>
```

A developer can get that node using `document.querySelector()` and then explore the tree directly. For example:

```javascript
const node = document.querySelector(...);

node.tree;
/*
HtmlNode {
  tag: 'div',
  attributes: {},
  children: [
    HtmlNode {
      tag: 'h1',
      attributes: {},
      children: [
         TextNode{ text: 'Hello, World!' },
      ],
    },
  ],
}
*/
```

### Portable
Since each custom component own their own virtual tree and are tasked with managing their own update cycles, you can
 safely call the VirtualDOM creator as many time as needed. More importantly, the root custom element created through
 the framework can be safely moved or removed without the need to use the framework. Developers can safely manipulate
 the custom element from another framework as well.

For example:

```javascript
new VirtualDOM(Component).renderInto('#app');

const node = document.querySelector('#app > vdom-component');
// We can do whatever we want to this node, like moving it or deleting it.
```

Portability is something I feel strongly about and would like to improve in the future, in particular:
- Allow renaming the custom element to make sure they can easily be found with `querySelector`.
- Allow creating the components directly through HTML and having a method for the framework to find and create those
 components
- Allow passing HTML to the components when created through HTML or frameworks, and have that HTML be converted to a
 virtual DOM structure.

### Extensible
Each developer have their own opinions on what style of API they would like to use when creating web applications
. I personally often look for ways to add my favorite APIs or tools from other frameworks into the one I am using and
 feel disappointed when I see that the framework does not support them. Virtual DOM makes only one assumption with how
 it handles components - they should only be functions - and allows developers to hook into its node creation cycle
 through the use of component contexts.

You can read more about context in the [context](/context/overview) section of this documentation. The
 [recipes](/recipes/recipe-index) section also list a few recipes showing how to add advanced APIs to the framework
 throughcontext, including React-like context API, state reducers, lifecycle methods, or React-like hooks.
