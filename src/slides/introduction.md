class: center, middle, inverse

# Creating UIs for the modern Web

---

# Who am I?

.image.center.rounded[![my face](https://avatars3.githubusercontent.com/u/20424444?s=460&u
=1f07f0b61d2f7a899b10c87103832281741ea9df&v=4)]

**Guillaume St-Pierre**
- Full-Stack Software Developer at Codecov
- Fourth year at Carleton University in Computer Science
- General web development nerd

.footnote[You can find me on github, https://github.com/Minivera]

---

# Why are we here?

This presentation was created as a part of a Directed Studies (COMP4901) course supervised by Dave McKenney. The
 goal of the study was to explore various technologies and raise interest in these technologies by giving a
  presentation on the subject.

All the content created for the study and discussed here can be found here: https://github.com/Minivera/carleton-web-dev

Feel free to explore the hosted content.

---
class: center, middle, inverse

# Agenda

### Introduction
### HTML and the DOM
### The VirtualDOM and React
### Native UIs with Web Components
### Web Assembly and Java
### Closing thoughts
### Questions

---
class: center, middle, inverse

# Introduction

---

layout: false
.left-column[
  ## Why study web development?
]
.right-column[
  Web Development is a fascinating field that requires thinking outside the box and wearing many hats. For example, 
  many web developers are now expected to have experience in:
  
  - Cryptography and security
  - AI and Machine Learning
  - Data storage
  - Computer system infrastructure
  - DevOps
  - Design and UX design
  - Sales
  
  Only to name a few.
]

???
Web development is challenging and rewarding, yet lets you explore the field like no other. 
Ask to try thinking of a system you use that doesn't have a component that calls a web service?
---

layout: false
.left-column[
  ## Why study web development?
  ## Why study frontend development?
]
.right-column[
  Frontend development is the sub-field of web development that covers any work seen or used by a user, think a
   website. It can also include working on CLI tools, user facing APIs, or even Desktop applications.
  
  **You do not need to know or work in JavaScript to be a frontend developer.**
  
  I once interviewed with a company that builds their frontend in OCaml (Darklang, if you are interested).
  
  Frontend development is often called a mess. If you like tearing your hair off, but feel rewarded when users
   mention how slick your UI is, frontend is for you.
]

???
Mention that frontend development can be rigthfully called a mess.
---

layout: false
.left-column[
  ## Why study web development?
  ## Why study frontend development?
  ## What did we study?
]
.right-column[
  The directed study focused on exploring frontend web technologies.
  
  In particular:

  - The DOM API and the virtual DOM, with a focus on React and algorithms.
    
  - Web Components and dynamic UI elements.
  
  - Web Assembly and TeaVM .
   
  - Lots of code, and a lot more documentation.
]

???
- We explored the DOM API as a way to manipulate a static web page and its modern evolution, the virtual DOM. We
   created a couple of applications in React, studied the algorithms that power than framework and 6 others, and
    finally created our own framework using the technology.
    
- We explored Web Components as a way to create new HTML tags using JavaScript to create portable and dynamic UI
   elements, but also as a way to create complete applications natively.
  
- We explored the Web Assembly format for executing code in any language on the browser. We then studied TeaVM as a
   way to use Java in the browser to render web applications.
   
- We wrote a lot of code, and a lot more documentation.
