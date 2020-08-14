---
class: center, middle, inverse

# Native UIs with Web Components

---
class: center, middle

While React was becoming more popular, other technologies started to appear to provide similar experiences to developers
. In particular, browser implementors started investigating the ability to create custom HTML elements with
 JavaScript. The same way you would be able to create a `<div>` element, you could create a `<my-card>` element to
  display the content in some kind of card.

That project evolved into custom elements and the Shadow DOM, or, as they are more commonly called, Web Components.

This alternative technology for creating components and applications was a very interesting target for study.

---

layout: false
.left-column[
  ## What are web components?
]
.right-column[
  Web Components are a framework to create custom HTML elements that use the DOM API to display content based on some
   arbitrary HTML code. They follow the React component pattern, but stick close to the DOM API.
   
  In fact, Web Components are often described as complementary to the Virtual DOM. On one side, they enable theme
   developers to provide custom elements with all the CSS and JavaScript embedded. On the other, their reliance on
    the DOM API means we can use Virtual DOM frameworks in them.
]

---

layout: false
.left-column[
  ## What are web components?
  ## Custom elements
]
.right-column[
  A custom element extends a normal DOM element. It is defined in the window object. When the element is added to the
   HTML structure, the browser takes care of calling your code.
  
  ```javascript
class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  // Called when the element is added to the DOM
  connectedCallback() {
    // From here, the DOM API is used.
    this.appendChild(...);
  }
}

window.customElements.define('custom-element', CustomElement);
  ```

```html
<custom-element />
```
]

---

layout: false
.left-column[
  ## What are web components?
  ## Custom elements
]
.right-column[
  We can also extend normal elements to provide more advanced functionalities.
  
  ```javascript
class CustomElement extends HTMLAnchorElement {
  constructor() {
    super();
  }
  
  // Add any functionality you want!
}

window.customElements.define('custom-element', CustomElement, { extends: 'a' });
  ```

```html
<a is="custom-element" />
```
]

---

layout: false
.left-column[
  ## What are web components?
  ## Custom elements
  ## The shadow DOM
]
.right-column[
  The shadowDOM is a special structure you can add to a web component to hide its content from the rest of the DOM
  . JavaScript executed outside of the web component cannot interact with this structure and styling is scoped to
   that component.
   
   **This enables truly modular CSS.**.red[*]
   
   ```html
<custom-element>
  #ShadowRoot
    <style>
      /* This style won't "bleed" out of this element! */
    </style>
    <div>
      <!-- And these elements are safe from external code! -->
    </div>
</custom-element>
   ```

  .footnote[.red[*] Like alcool, the Shadow DOM is best consumed in moderation]
]

---

layout: false
.left-column[
  ## What are web components?
  ## Custom elements
  ## The shadow DOM
  ## That's it?
]
.right-column[
  There are few more functionalities that web components provide, but these last three slides cover most of it.
  
  Web components are a new standard, they provide a tool, it's the community's job to expand on it.
  
  Many projects have sprung up to improve the technology and make apps possible, here are a few I recommend checking out:
  - Stencil
  - Ionic
  - The Polymer Project
 
  You can read more by following this tutorial: https://github.com/Minivera/carleton-web-dev/tree/master/src/wc-course
  -website.
]
