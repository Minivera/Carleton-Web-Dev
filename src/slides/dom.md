---
class: center, middle, inverse

# HTML and the DOM

---
class: center

The Domain Object Model - or DOM - is the technology that powers your web pages. It transforms the HTML structure
 into a tree of nodes.

![DOM](https://miro.medium.com/max/560/1*h5XbI4n8eIKnmaeWPRmKOQ.png)

???
The Domain Object Model - or DOM - is the system that powers all modern web pages. When your browser loads an HTML
 file and processes it, it creates a DOM structure that mirrors the HTML structure. This structure is rendered by the
  browser and can be manipulated in JavaScript.
---

layout: false
.left-column[
  ## Why the DOM?
]
.right-column[
  Created in the mid 90s both by Netscape and Microsoft.
  
  Developers wanted a way to create interactive web pages rather than simply deliver static web pages with funny GIFs.
  
  The DOM allowed those developers to interact with the structure of the page and react to events.
  
  As JavaScript evolved and browsers changed, the DOM became the _de-facto_ standard for manipulating Web pages.
]

???
In the mid 90s, Netscape and Microsoft were trying to gain an edge in the so called "browser wars". JavaScript
   first appeared at Netscape, but it was then followed by JScript at Microsoft, which implemented the first draft of
    the DOM.
---

layout: false
.left-column[
  ## Why the DOM?
  ## How does it work?
]
.right-column[
  The global document object can be used to walk the DOM tree.
  
  There are multiple functions available to fetching and manipulating nodes.
    
  ```javascript
// You can find nodes in the document using standard CSS selectors
document.querySelector('.main');
// You can also use older functions
document.getElementsByClassName('main');
  ```
]

???
The DOM is embedded directly into JavaScript, one cannot go without the other. Remember the `document` node from
   the earlier image? This node is available as a JavaScript global object. From there, you can walk the DOM tree
    using multiple functions.
---

layout: false
.left-column[
  ## Why the DOM?
  ## How does it work?
]
.right-column[
  Once you have a reference to a node, you can do whatever you want with it.
    
  ```javascript
// You can very easilyc reate a node
const node = document.createElement(a);

// You can change its content
node.innerHTML = 'Hello, World!';

// You can move it around
document.querySelector('.other').appendChild(node);

// You can delete it
node.parent.removeChild(node);

// You can change its attributes
node.setAttribute('data-test', 'test');

// And so much more
node.style.color = 'red';
  ```
]

---

layout: false
.left-column[
  ## Why the DOM?
  ## How does it work?
  ## Why use something else?
]
.right-column[
  The DOM API can be inconsistent and clunky due to its complex history. It is not intended to power complete
   applications.
  
  You could create an entire application only using the DOM API, but each potential substitution in the UI would need
   to manually be accounted for.
  
  This is what we did for years. It wasn't great and very hacky.
  
  JQuery helped, but yeah...
  
  Something had to be done.
]

???
While very useful, the DOM API can be inconsistent and clunky due to its complex history. It is not intended to
power complete applications, but to power small elements in a web page.

You could create an entire application only using the DOM API, but it would be a massive bloat of complex and hard
to test JavaScript code. Each potential substitution in the UI would need to manually be accounted for.

Sadly, this is what we did for years. New tools would come to simplify and unify the operations (Each browser did
pretty much their own thing with the DOM), and we used cheap hacks to get around the pain of working with
JavaScript.

Something had to be done.
