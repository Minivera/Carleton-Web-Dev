---
class: center, middle, inverse

# Web Assembly and Java

---
class: center, middle

Web Assembly is yet another technology created by browsers implementors.

Contrary to web components or the Virtual DOM, WASM's goal is not to only provide a way to create UIs

Web Assembly will finally allow you to write frontend code in any language.
 
It was first released with support for C++ and Rust, but has since grown to support many languages.

It is backed by Microsoft and other big corporations and has a very active community.


???
Web Assembly is yet another technology created by browsers implementors, yet, it couldn't be more different to the
 other technologies we studied.
 
I still remember when people told me we could finally unify our codebases and code everything in JavaScript thanks to
 the rise of Node.js. Web Assembly turns the table by allowing all languages to be ran on browsers. It was first
  released with support for C++ and Rust, but has since grown to support many languages.

With support from Microsoft and other big corporations plus multiple projects to bring WASM out of the browser and
 into desktop means it is there to stay and was a good target for the study.

---

layout: false
.left-column[
  ## What is Web Assembly?
]
.right-column[
  Web Assembly is a text/binary language that can be interpreted by a virtual machine at near native speed in browsers.
   
  It lives near the JavaScript VM and can even call scripts in JavaScript. This a browser based JVM.
  
  It is much more isolated and secure than the JavaScript virtual machine.
  
  Languages that want to support WASM have to provide a compile target to WASM in their compiler.

  .footnote[WASM text code looks a lot like LISP]
]

???
Web Assembly - or WASM - is a text language that can be interpreted by a virtual machine at near native speed in
browsers. It lives near the JavaScript VM and can even call scripts in JavaScript. This a browser based JVM.

It is much more isolated and secure than the JavaScript virtual machine.

Languages that want to support WASM have to provide a compile target to WASM in their compiler. WASM can
be written both in text and as a binary file means it can be read, making it easier to understand and to retro
-engineer than the JVM.
---

layout: false
.left-column[
  ## What is Web Assembly?
]
.right-column[
  Web Assembly does not stop at your browser, it can now be executed in desktop environments thanks to the
   WASI standard.
   
  WASI enables developers to create portable applications in any language they want without having to compile for all
   possible architectures. Like the JVM, but without Java.
  
  If you hate cross-compilation, WASI is one project to follow.
]

???
Web Assembly does not stop at your browser however, it can now be executed in desktop environments thanks to the
WASI standard.

WASI enables developers to create portable applications in any language they want without having to compile for all
ossible architectures. Like the JVM, but without Java.

If you hate cross-compilation, WASI is one project to follow.
---

layout: false
.left-column[
  ## What is Web Assembly?
  ## TeaVM
]
.right-column[
TeaVM is a project to create frontend application in java.

It provides a complex framework for creating dynamic frontend applications in Java.

It has all the tools you would except, like:

- A routing system to track URL changes
- A REST client
- Widgets for common elements like paginates lists

You can read more by following this tutorial: https://github.com/Minivera/carleton-web-dev/tree/master/src/java-course
-website.
]

???
TeaVM was originally a project to create frontend application in java. The tool would compile your Java code to
optimized JavaScript code with sourcemap support. It has since added WASM support, creating a more native experience.

It provides a complex framework for creating dynamic frontend applications in Java. It has all the tools you would
except, like:

- A routing system to track URL changes
- A REST client
- Widgets for common elements like paginates lists

You can read more by following this tutorial: https://github.com/Minivera/carleton-web-dev/tree/master/src/java-course
-website.
---

layout: false
.left-column[
  ## What is Web Assembly?
  ## TeaVM
  ## What if I don't like Java?
]
.right-column[
  Web Assembly can be used to create UIs in other languages that Java, for example:
  
  - Blazor from Microsoft is a framework for creating frontend applications. It ships with the
   .NET framework and is a part of ASP.NET MVC applications.
  
  - asm-dom in C++ is a VirtualDOM implementation usable with WASM.
  
  - Far too many packages in go to count, but I can recommend vugu and gas.
  
  - Qt now has a target for Web Assembly with C++ and Python.
]

---

layout: false
.left-column[
  ## What is Web Assembly?
  ## TeaVM
  ## What if I don't like Java?
  ## Should you create UIs in WASM?
]
.right-column[
  When it was first announced, WASM was shown running Unity at native speed in a browser.
  
  The expected use case was to run complex computations that JavaScript is not equipped for.
  
  The tech has not evolved as much as we expected in the direction of building UIs.
  
  WASI complicates things as there are no intended support for any sort of DOM-like API.
  
  Creating UIs in WASM is more than possible, but it is better used to support a JavaScript UI in my opinion.
]

???
When it was first announced, WASM was shown running Unity at native speed in a browser. The expected use case was
to run complex computations that JavaScript is not equipped for.

While there was a lot of traction for UIs with WASM in the early days, it has not evolved much in that direction.

WASI complicates things as there are no intended support for any sort of DOM-like API, making any VirtualDOM
frameworks difficult to port over to WASI.

Creating UIs in WASM is more than possible, but it is better used to support a JavaScript UI in my opinion.
