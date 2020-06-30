# Creating a web components application
In the [previous tutorial](/src/react-course-website/README.md), we explored creating a complete application with
 React and react-router. However, we also saw that creating applications with React meant discovering a whole new
 language with JSX and using complex tools like bundlers and transpilers.

Thankfully though, browsers have been evolving to bring the React-like experience of creating reusable and
 modular apps with components to developers without the need for libraries. The experience has evolved into the [web
 components standard](https://github.com/w3c/webcomponents) and it has since been [adopted in some form by more than
 74% of browsers, including most modern browsers](https://caniuse.com/#search=custom%20elements).
   
In this second tutorial, we will be discovering web components by recreating the application from the previous
 tutorial with this new technology.
 
While not required, this tutorial expects you to have completed the previous tutorial.

## What are web components?
Web components are a new API available to JavaScript developers that allow them to create custom HTML tags, extend
 existing HTML tags, or even extend other web components found on the web. By creating those custom HTML tags, called
 custom elements, we create reusable components that can be dropped in any HTML file where our JavaScript scripts
 are included. This makes web components far more portable that React components as any developer can simply import
 our scripts and use the components directly without needing any base framework. While React components can also be
 considered portable, you do need React installed to use them. Even more impressive, web components ca be used as
 tags in React!

## Prerequisites?
Contrary to React, web components do not require any library to be used. In fact, you could write the code in a
 single HTML file and use it directly inside of a browser.

In our case, we will be creating a few script files that we will include as modules in the HTML file. To be able to
 load all those files locally in our browsers, we still need some sort of web server to serve those files to us
 . Enter `serve`, a small tool that generate a web server to serve HTML files on localhost. 

To install `serve`, run `npm install -g serve`. The `-g` flag means that NPM will install this package globally
, making it available anywhere on your computer. Simply typing `serve` in a terminal will transform the working
 directory into a web server. 

## Getting started
To get started, create a folder for this tutorial on your computer. Make sure to have a terminal open and navigate to
 that folder so we can run the `serve` command. Create an `index.html` file in that directory and copy the following
 content in it.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">  
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Web components demo</title>
    </head>
    <body>
        <user-posts></user-posts>
        <script type="module" src="./index.js"></script>
    </body>
</html>
```

Also create an empty `index.js` file in that same directory and type `serve` in your terminal. You will be given a
 URL to see the served application which should look something like `localhost:5000`. Copy that URL (`serve` should
 have copied the URL to your clipboard automatically) in a browser to see the file.

Let's now dive into the file itself, as there are a few new concepts compared to the React tutorial. First, you will
 notice the seemingly unknown `<user-posts>` tag. By default, our browser does not know any tag under that name and
 will simply render nothing. However, with the power of web components, we can define that tag and give it behavior.

You'll also notice the `type="module"` attribute added to the `<script>` tag. Do you remember those fancy `import
` and `export` commands we used with React? Those have not been supported by browsers for the longest time, meaning
 that you had to bundle modular code into a single JavaScript file before giving it to clients. Thankfully, imports
 are now even [more supported than web components and can safely be used in most browsers](https://caniuse.com/#feat=es6-module-dynamic-import).

The `type="module"` tells the browser that the script we are including will use import and export directive. Without
 this attribute, we could not use those keywords and we would get an error when trying to load the JavaScript file.

## Loading a user
Let's now define the `<user-posts>` tag by creating a custom element with that name. Start by creating a `userPosts
.js` file and copy the following code.

```js
// userPosts.js
customElements.define(
  "user-posts",
  class extends HTMLElement {
    constructor() {
      super();
    }
  }
);
```

`customElements` is the namespace we use to define and access custom elements (The custom tags that power web
 components). By calling `customElements.define`, we tell the browser that there is now a tag a developer can use
 name after the first argument. The second argument can either be a class or a function, but as [most browsers now
 support classes](https://caniuse.com/#feat=es6-class), we will use classes since they make the logic far easier to
 code. Our class _must_ extend the [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) base class from the global namespace.

Why is that? As we said earlier, a custom element is a custom tag that the browser can use to render our web
 component. To do so, the browser needs to know that this custom elements at least has the base behavior shared by
 all other elements. All HTML tags extend this class as well, creating a very wide inheritance tree.

Also note that the custom elements API _requires_ that custom elements have at least two words separated by a dash
, with the first word often used for a namespace.

Let's now add some behavior to this component.

```js
// userPosts.js
customElements.define(
  "user-posts",
  class extends HTMLElement {
    constructor() {
      super();

      this.user = null;
    }

    connectedCallback() {
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(result => result.json())
        .then(user => {
          this.user = user;
          this.render();
        });
      this.render();
    }

    render() {
      if (!this.user) {
        this.innerHTML = "Loading...";
        return;
      }

      this.innerHTML = "loaded";
    }
  }
);
```

Let's start deconstructing the code with the constructor. Here, we define a property on the class called `user` to
 hold the user data once fetched.

We then define a method called `connectedCallback`. This method is a [lifecycle method](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks) of the web component that is
 called when the browser starts rendering the component. When this method is called, we should start rendering our
 component using the `render` method we created. While you certainly can render directly in the constructor. this can
 cause a whole lot of issues and should be avoided. This lifecycle method is also the best place to start fetching
 data from an API. We do exactly that, recycling some of the code from the previous tutorial to load a user from the
 jsonplaceholder API.

Finally, we write the render method. Remember that all custom element extend the `HTMLElement` base class, which means
 they have access to most of the normal DOM api we are used to for normal DOM nodes. Here, we render the text
 "loading..." while we wait for the API to answer, and then render the "loaded" text once it has answered.

Go back to our `index.js` file and add this line at the top: `import './userPosts.js';`. Refresh the page and you
 should see the component render the loading, then loaded text.

## More components!
When the user will be loaded, we want to show a welcome title and the a list of posts this user would have access to
. Let's start with the welcome title. Create a `userWelcome.js` file and copy this code in there.

```js
// userWelcome.js
customElements.define(
  "user-welcome",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["username"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "username" && oldValue !== newValue) {
        this.render();
      }
    }

    connectedCallback() {
      this.render();
    }

    render() {
      if (!this.hasAttribute("username")) {
        this.innerHTML = "";
        return;
      }

      this.innerHTML = `<h1>Welcome ${this.getAttribute("username")}</h1>`;
    }
  }
);
```

What exactly is happening here? Let's first start by explaining what attributes are. When writing a tag in a HTML
 file, you can add various attributes to help the tag do its job. For example, to display an image, you have to write
 `<img src="some_file.jpg" alt="alternative text">`. Here, the `src` and `alt` values are attributes. Attributes can
  only be given primitive types (String, number, booleans).

You might also have noticed that, if you go on any page and change the URL of a `img` tag through the developer's
 console, that image will change to the new image you added. That's possible because the `img` element listens for
 any change to the `src` attribute and rerenders when it changes. We can do the same through the `observedAttributes
 ` read-only getter and the `attributeChangedCallback` lifecycle method.

The `observedAttributes` getter must return an array givin the names of all the attributes that are to be actively
 watched by the element. When an attribute in that array changes, it triggers the `attributeChangedCallback` method
 with the name of the attribute, and the old and new values. In our case, we want to watch for the user's name to
 render the welcome title when it is set.

Finally, the render method check if the attribute for the user name exists and renders a `h1` title if it does. Here
 we make use of `innerHTML`'s ability to take any HTML string and render it into valid HTML nodes. By combining this
 with JavaScript teplate literals, we can very easily render this node with an almost JSX API.

Next, we will want to render a list of posts. Create a `postList.js` file an copy the following code into it.

```js
// postList.js
customElements.define(
  "post-list",
  class extends HTMLElement {
    constructor() {
      super();

      this.posts = null;
    }

    connectedCallback() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(result => result.json())
        .then(posts => {
          this.posts = posts;
          this.render();
        });
      this.render();
    }

    render() {
      if (!this.posts) {
        this.innerHTML = "Loading...";
        return;
      }

      const container = document.createElement("ul");

      this.posts.forEach(post => {
        const postNode = document.createElement("li");
        container.appendChild(postNode);
      });

      this.innerHTML = "";
      this.appendChild(container);
    }
  }
);
```

This code is essentially the same as the `userPost.js` file, but we are fetching posts instead of the user and we
 then render each post as an empty `li` tag inside of a `ul` container. We could have used the template literal
 method, but we will see in the next section why it won't be possible in this case.

Let's now change the render method of the `userPost.js` file to create those two components and see the result. First
, change the `index.js` file to the following code.

```js
// index.js
import "./userWelcome";
import "./postList";
import "./userPosts";
```

The order is important as we need to define the tags we will be using in `userPosts` before we create that class.

Next, change the render method of `userPosts` to:

```js
render() {
  if (!this.user) {
    this.innerHTML = "Loading...";
    return;
  }

  this.innerHTML = `
    <div>
      <user-welcome username="${this.user.name}"></user-welcome>
      <post-list></post-list>
    </div>
  `; // Always close the tags with a closing tag when using innerHTML, don't use <post-list />
}
```

You can see how we use the attribute to our advantage here. Refresh the page and try changing the `username
` attribute of the welcome message to something else. You should see the name in the message change accordingly.

## Define the list element
When we created the `postList` component, we decided to create a `li` node for each entry post fetched from the API
. To add content in there, we could add more logic to the `postList` render method, but creating a specific component
 for that purpose gives us more freedom to change the implementation later. We do run into a small issue by creating
 a new component thought. To describe that issue, let's look at the final HTML created in the web page. Open the
 debugging tools of your browser and inspect the HTML, you should see something like this:

```html
<body>
    <user-posts>
        <div>
          <user-welcome username="Leanne Graham">
            <h1>Welcome Leanne Graham</h1>
          </user-welcome>
          <post-list>
            <ul>
              <!-- Lots of <li> -->
            </ul>
          </post-list>
        </div>
    </user-posts>
</body>
```

As you can see, the tags for our custom elements are added into the HTML structure. As we said earlier, web
 components are custom HTML tags the browser can render using our we component code. This means they cat like normal
 tags and can be styled or have attributes. Let's imagine that we create a `post-element` custom element and we have
 the `forEach` loop in `postList` render that, then we,d end up with this HTML:

```html
<post-list>
  <ul>
    <post-element>
      <li></li>
    </post-element>
    <!-- This structure repeats for each post. -->
  </ul>
</post-list>
```

Suddenly, the `li` tag is not a direct descendant of the `ul` tag, there's our post in between. This can cause major
 issues for styling or rendering, so we need to find a way to replace that `post-element` tag with an `li` tag
 . Thankfully, the custom elements API has something ready for this. The same way we can extend the base `HTMLElement
 ` class, we can also extend all other elements. By extending the `HTMLLIElement` class instead, we can make sure
 our custom element will behave like a `li` tag. Let's try that, create a `postElement.js` file and copy the
 following code in it.

```js
// postElement.js
customElements.define(
  "post-element",
  class extends HTMLLIElement {
    connectedCallback() {
      this.render();
    }

    render() {
      if (!this.post) {
        this.innerHTML = "";
        return;
      }

      this.innerHTML = `
        <h2>${this.post.title}</h2>
        <p>${this.post.body}</p>
      `;
    }
  },
  { extends: "li" }
);
```

We've changed the base class we're extending to `HTMLLIElement` and added a simple render method to generate a title
 and a paragraph for the post. We've also added a third parameter that tells the browser our component extends the
 `li` element. Unfortunately, the browser cannot tell what we're extending only from the class, so we have to give it a
 little push through this third parameter.

You might also have noticed that we are using `this.post` rather than a attribute. This is called a property. The
 difference between properties and attributes it that attributes can be added in the HTML structure an must only
 contain the primitive types. Properties are more permissive, but can only be set through JavaScript. We can set them
 to anything, but we have to use the `node.property` notation to do so, which makes them a bit harder to work with.

We now have a custom element that will, for all intent and purposes, act like an `li` element when added to the HTML
. Let's do just that by modifying our `postList` component's render method.

```js
// postList.js
render() {
    if (!this.posts) {
        this.innerHTML = "Loading...";
        return;
    }
    
    const container = document.createElement("ul");
    
    this.posts.forEach(post => {
        // Create an li node, but tell it to use the post-element code
        const postNode = document.createElement("li", { is: 'post-element' });
        // Set the property
        postNode.post = post;
        container.appendChild(postNode);
    });
    
    this.innerHTML = "";
    this.appendChild(container);
}
```

If we used `document.createElement("post-element")` rather than the method above, the browser would not render the
 component like we want it to. We really need to tell the browser explicitly "This is a `li`, but use the `post
 -element` code to render it.", and that is done through the `is` property of the options object. If we were creating
 it through HTML, we would need to use the notation `<li is="post-element">`. However, if we did it that way, we
 could not set the `post` property on our `postElement`. Remember earlier when we said we could not use the template
 literal syntax? This is why.

Finally, edit the `index.js` file again to add our new file.

```js
// index.js
import "./userWelcome";
import "./postElement";
import "./postList";
import "./userPosts";
```

Refresh your page and you should see the list render all our posts as `li`s.

## Conclusion
Today we've explored web components by creating a simple app to feth a user and their posts. We've explored custom
 elements, elements extending tags, attributes, properties, and reactivity. We only scratched the surface of what web
 components can do however. We have not covered the shadowDOM nor slots in this tutorial and we made use of template
 literals rather than templates to generate HTML. I recommend reading the MDN docs on these subjects and trying to
 improve today's tutorial to add a shadowDOM based component an templates.

- https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
- https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
