# Creating a React application with React-router
This tutorial will guide you in building your first React application using a variety of tools. You will learn the basics of NPM and bundling, how to structure a simple React application, how to handle routing with React router and how to manage complex state with reducers. Together, we will build a simple application using a remote JSON api.

Note that familiarity with Node.js, JavaScript and NPM (Node Package Manager) is expected in this tutorial. Note also that all commands throughout this tutorial are written in Linux bash. If working on an OSX machine, this is supported by default in the terminal app. For Windows user, you will need to use the [ubuntu shell for windows](https://ubuntu.com/tutorials/tutorial-ubuntu-on-windows#1-overview) or an equivalent.

## Prerequisites
Before we can start working in React, however, we need to make sure we have the tools needed to do so.

You will need a version of [node.js](https://nodejs.org/en/) installed on your computer. While you can install any version, I strongly recommend installing the LTS (Long-term support) version provided by node.js. When installing node.js, NPM should automatically be installed a well, make sure that both tools are working as expected by running the following commands. The outputs of these commands should look similar to the given output.

```
node --version
v12.16.3

npm --version
6.14.5
```

You will also need a comptent text editor or, better yet, an IDE. I can recommend Atom as a text editor and Visual Studio Code as an IDE.

## Getting started
To get started with the tutorial, we need to install React, React-router and a tool called a bundler to enable us to compile and test the code. We use NPM to install those dependencies.

Before we start, create a folder where you want to have this project live, for example `mkdir ~/js/COMP2406/tutorial` and move into that folder. Once in there, run `npm init -y`. This command will have created a `package.json` file inside the directory where you ran it. We are not ready to install the dependencies.

```
npm install --save-dev parcel
npm install --save react react-dom react-router-dom
```

Parcel is our bundler. Since we only need it during the development process, it is a good practice to save it as a development dependency. This way, a person or a tool installing dependencies can specify to only install the production dependencies and save themselves the many seconds needed to download and install parcel.

But what is a bundler exactly and what does parcel do? Modern JavaScript - and especially React's version of JavaScript - is not fully supported by all browsers or by node.js. This means that we have to "compile" - a more common word to describe this process is transpile - the JavaScript we use into a JavaScript that can be understood by all. Once the code is transpiled, we also need to combine all our code and its dependencies into a single JavaScript file. I strongly suggest reading [this article on the subject](https://www.sitepoint.com/javascript-modules-bundling-transpiling/).

Parcel is a fast and simple to use bundler that does not require any special configuration to work. Let's open the package.json file and replace the `"script"` part of this JSON with these scripts:

```
{
	...
  "scripts": {  
    "start": "parcel serve src/index.html -p 3000"
  },
  ...
}
```

This command will execute parcel on the `src/index.html` and, once it has properly run, it will make the application available under `localhost:3000`. Let's test this by creating a `src` directory and adding the `index.html` file into it. Let's add this HTML inside that file:
 
```html
<!doctype html>  
<html lang="en" data-framework="react">  
    <head>  
        <meta charset="utf-8">  
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React-demo</title>  
    </head>  
    <body>  
        <div id="app" />
    </body>  
</html>
```

With this HTML file created, we can test the command we added earlier in the `package.json` file. Run `npm start` in your command line terminal. Parcel will do its thing then let you know that the application has been successfully built. Once that's done, navigate to http://localhost:3000 to see the application. it should show you an empty page, but this is fine, we'll be adding content later. You can keep parcel running in the background while doing this tutorial, parcel watches your files for changes, so anytime you modify one, it will automatically rebuild and refresh the page with your changes.

## Hello, world!
Before we dive into the application, a "Hello, world!" example is in order. Start by creating a `index.jsx` file at the root of the `src` folder and add the following code to it:

```jsx
// src/index.jsx
import React from 'react';  
import ReactDOM from 'react-dom';  
  
const App = ({ message }) => (
  <div>
    <h1>Hello, world!</h1>
    <p>{message}</p>
  </div>
);
  
ReactDOM.render(  
  <App message="Hello from React" />,  
  document.querySelector('#app')  
);
```

What exactly did we write here? Let's go through it in order. First, the `jsx` extension describes this file as a JSX file. JSX, or JavaScript eXtended, is a format created by React to describe web applications in a less verbose way. You see these HTML like tags in that JavaScript file? This is what JSX is. The format allows to write HTML and JavaScript together in a single file and stay within the known JavaScript idioms. Behind the scenes, parcel will translate that to a more complex JavaScript file for the browser to read. If you are using the suggested IDE for this tutorial, it should also highlight and color everything correctly.

Next, we import two modules `React` and `ReactDOM`. `React` is the code of the React ecosystem. While it is not used directly anywhere, it needs to be imported in every `jsx` file as the first import for parcel to be able to transpile the JSX format, so keep that in mind. `ReactDOM` on the other hand is the link between the browser and the React ecosystem. It will take care of displaying and updating the web applications in the browser.

We then create what is called a component. A component is a function or a class that contains reusable behavior. For example, here the `App` component will create a `div` tag and add a `h1` and `p` tag to this `div`. Components are very powerful in React as they allow you to modularize your code and prevent code duplication, they're also far easier to manage and to test than huge, bulky files. Throughout this tutorial, you will create multiple components and combine them together to create a complex application. 

You may have noticed that we used a strange syntax to declare the `App` component. `const App = ({ message }) => (`. The `() =>` syntax is called an arrow function. It's a shortened version of the normal `function` declaration with some added benefits. Check the [excellent documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for more information on arrow functions. The other strange syntax `({ message })` is called object deconstruction. Every component takes a single object parameter called the props. These props are what is given when the component is added to the application, think attributes on DOM nodes. Here, we deconstruct this props parameter to extract the `message` key from it, which can contain a small message that can be parameterized. The following code would be equivalent if we didn't want to use object deconstruction.

```javascript
const App = (props) => {
  const message = props.message;
  // Could also do, const { message } = props;, which is also an example of deconstructing the object.
};
```

We then return the JSX structure to render. You will notice that, to print the message, we use the `{}` notation and write the message variable inside of it. In JSX, whenever you use `{}`, is tells the compiler to execute whatever JavaScript code is in these brackets. In this case, "executing" a variable means printing it inside of the HTML structure.

Finally, we use `ReactDOM.render` to render the application component into the `#app` div inside our HTML file. In JSX, components are created exactly like normal HTML nodes. By writing `<App message="Hello from React" />`, we tell React to execute the `App` function created above an pass the attribute `message` with any value we want. Anything we add inside the HTML-like syntax will be given to the `props` parameter of the `App` function. We can also very easily pass JavaScript code by using the `{}`, like we'll see later.

Save the `index.jsx` file and then add `<script src="./index.jsx"></script>` at the end of the body tag to tell parcel to load that file. After a few seconds, the application should update with a "Hello, World!" and the message rendered on the screen. Feel free to play around with this example until you're familiar with how it works, then we can switch to the next part.

## Real application
Now that we have everything set-up, we can start building a real application. Let's create a `app.jsx` file inside the `src` folder and copy the `App` component there, like this:

```jsx
// src/app.jsx
import React from 'react';  

export const App = () => (
  <div>
    <h1>Hello, world!</h1>
  </div>
);
```

We added the `export` keyword before the fonction declaration to tell JavaScript to export that variable for other files. We can then rewrite the `index.jsx` to take advantage of this like this:

```jsx
// src/index.jsx
import React from 'react';  
import ReactDOM from 'react-dom';  
  
import { App } from './app';
  
ReactDOM.render(  
  <App />,  
  document.querySelector('#app')  
);
```

It is a good practice to separate your components into unique files, like you would for class in Java. Generally, one file should export a single component to make the file system more manageable.

### User management
Now that we have a file for the `App` component, let's start adding some behavior in there. We will use [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/) as our API, but a real world application would likely use a more real API. The first thing we want in our application is user management. Let's imagine that our users have access to an external log-in page and, once logged in, we are given enough information to fetch the user's data from the API. Let's add this to our component.

```jsx
// src/app.jsx
import React, { useState } from 'react';  

export const App = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: userId,
    email: "test@test.com",
    name: "test"
  });
    
  return loading ? (
    <div>
      loading...
    </div>
  ) : (
    <div>
      {user.name} 
    </div>
  );
};
```

What is this `useState` business here? In React, you can use these functions called hooks to insert state management inside of your components. For example, here we define two variables - called `loading` and `user` -  by deconstructing the array returned by the `useState` hook. Since state is meant to change and be tracked throughout the lifetime of our application - in the case of web applications, this means until the page is refreshed - the hook also provides us with a `set` function to update the state on demand. Whenever one of these functions is called, React will rerender itself by executing our components again. The value of the set state element will be updated and we will be able to react to state changes, like for the `loading` variable above.

Before we move forward, you might have noticed that we introduced a property in the `App` component called `userId`. We need to make sure to provide this property when we create the component in `index.jsx`. In our scenario, this ID would be given by our external log-in page.

```jsx
// src/index.jsx
import React from 'react';  
import ReactDOM from 'react-dom';  
  
import { App } from './app';
  
ReactDOM.render(  
  <App userId={1} />, // Added this property here
  document.querySelector('#app')  
);
```

Unfortunately, out user is not hardcoded. We don't want that, we want to fetch it from an API and display its information dynamically. Let's introduce a second hook into this mix to fetch the user from `jsonplaceholder`.

```jsx
// src/app.jsx
import React, { useState, useEffect } from 'react';  

export const App = ({ userId }) => {  
  const [loading, setLoading] = useState(true);  
  const [user, setUser] = useState(null);  
  
  useEffect(() => {  
    fetch("https://jsonplaceholder.typicode.com/users/" + userId).then(result => {
      return result.json();
    }).then(jsonResult => {   
      setUser(jsonResult); 
      setLoading(false);
    });   
  }, [userId]);  
  
  // This stays the same
  return loading ? (
    <div>
      loading...
    </div>
  ) : (
    <div>
      {user.name} 
    </div>
  );
}
```

Using the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), we send a request to `jsonplaceholder` and once it has been completely processed, we stop the loading and set the user's data. Try the application now to see the result. `useEffect` is another hook that will trigger the function we give as the first argument depending on its second argument. Every time the component function is executed, React will look in the array we provided as the second parameter to see if anything in there changed. For example, if we ever changed the userId, the `useEffect` function would execute again, fetching the new user. This is very useful in this case as we only want to fetch the user data at the start of the application and store it in state.

### Showing posts
Let's now create content for the user to view when they'll have logged-in the application. Create a new file inside the `src` folder called `home.jsx` and create a skeleton component called `Home`.

```jsx
// src/home.jsx
import React from 'react';

export const Home = ({ user }) => {
  return (
    <div>
      <h1>Welcome {user.name}</h1>
    </div>
  );
};
```

Now add the following code to fetch a list of posts from `jsonplaceholder` using the technique we used in the application component.

```jsx
// src/home.jsx
import React, { useState, useEffect } from 'react';

export const Home = ({ user }) => {
  // We're adding these hooks here
  const [loading, setLoading] = useState(true);  
  const [posts, setPosts] = useState(null);  
    
  useEffect(() => {  
    fetch("https://jsonplaceholder.typicode.com/posts").then(result => {
      return result.json();
    }).then(jsonResult => {  
      setPosts(jsonResult);
      setLoading(false);  
    });   
  }, []);

  // This stays the same
  return (
    <div>
      <h1>Welcome {user.name}</h1>
    </div>
  );
};
```

Why did we only provide an empty array to the `useEffect` hook this time? In the case of this URL, we have no "parameter" per say. However, we still want React to only execute this function once and then keep the result. By providing this empty array, we tell React that we have no dependencies, so it doesn't need to watch for changes. If we didn't give this array, it would crete an infinite loop where fetching would cause the `Home` component to be executed again which would trigger another fetch until your computer died. 

Next, we modify the returned JSX to render all the posts we received. To do this, we will use the `map` function on arrays and return an array of JSX nodes. React is able to translate that array into a list of HTML nodes and show it properly. Let's write that code.

```jsx
// Change the previously returned JSX to this
return (
  <div>
    <h1>Welcome {user.name}</h1>
    {loading ? null : (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
```

That's a lot of code, let's break it down.

The `{loading ? null : ()}` ternary operation will be executed (remember that code in brackets is executed like JS code) and return `null` is the application is loading. When receiving `null`, React will do nothing and ignore that value, allowing us to do nothing when the posts are loading. Once loaded, we render a `ul` element and then map over the posts.

The `key` prop in `<li key={post.id}>` is needed by React when using a map like this. The reason for that is that React will remember the order in which we add those elements using that key. If we ever change the order or change the elements, React is able to use those keys to optimize how it will update the list. It's important to always remember to add a key when giving an array to React, so important in fact, that React will nag you with console errors if you don't.

Finally, we can go back to the `app.jsx` file and modify it to use this newly create component.

```jsx
// src/app.jsx
import React, { useState, useEffect } from 'react';  

import { Home } from './home';

export const App = () => {
  // Hooks omitted for brevity

  return loading ? (
    <div>
      loading...
    </div>
  ) : (
    <Home user={user} />
  );
};
```

Try this new change in your browser to see the posts appear after a few seconds and render inside a list.

### Adding some code reuse
You might have noticed that we have used almost the same code twice for loading the users and posts. Is there a way to merge these two and stop duplicate it? The answer to that is a resounding yes! React allows you to create custom hooks for these purposes, let's create one together. Create a file called `useJsonPlaceholder.js` (notice this is a raw `js` file and not a `jsx` file.) in the `src` folder and let's copy the two hooks from `app.jsx` in there.

```javascript
// src/useJsonPlaceholder.js
import { useState, useEffect } from 'react';  
  
export const useJsonPlaceholder = (path) => {  
  const [loading, setLoading] = useState(true);  
  const [data, setData] = useState(null);  

  useEffect(() => {  
    fetch(path).then(result => {  
      return result.json();  
    }).then(jsonResult => {  
      setData(jsonResult);
      setLoading(false);
    });  
  }, [path]);  

  return [loading, data];  
};
```

We added a `path` parameter to the exported function to be able to pass which URL to fetch and then added a `return` statement to return the `loading` and `data` variables, but the code is almost identical.

Also note that we now provide the `path` parameter as the dependency for the `useEffect` hook, ensuring that if the path changes (For example, if we changed the user ID), the hook will be executed again.

However, thanks to this reuse, we can shorten the code in `app.jsx` and `home.jsx` quite significantly. Let's do this now.

```jsx
// src/app.jsx  
import React from 'react'; // We can remove the unused imports!  
  
import { useJsonPlaceholder } from './useJsonPlaceholder';  
import { Home } from './home';  
  
export const App = ({ userId }) => {  
  const [loading, user] = useJsonPlaceholder("https://jsonplaceholder.typicode.com/users/" + userId);  
  
  return loading ? (  
    <div>  
      loading...  
    </div>  
  ) : (  
    <Home user={user} />  
  );  
};  
  
// src/home.jsx  
import React from 'react';  
  
import { useJsonPlaceholder } from './useJsonPlaceholder';  
  
export const Home = ({ user }) => {  
  const [loading, posts] = useJsonPlaceholder("https://jsonplaceholder.typicode.com/posts");  
  
  return (  
    <div>  
      <h1>Welcome {user.name}</h1>  
      {loading ? null : (  
        <ul>  
          {posts.map(post => (  
            <li key={post.id}>  
              <h2>{post.title}</h2>  
              <p>{post.body}</p>  
            </li>  
          ))}  
        </ul>  
      )}  
    </div>  
  );  
};
```

That's a lot nicer!

We can also prepare some code reuse for the next section by moving the post HTML in its own file, let's try that. Create a `post.jsx` file inside the `src` folder, the code this code.

```jsx
// src/post.jsx  
import React from 'react';

export const Post = ({ post }) => (  
  <li>  
    <h2>{post.title}</h2>  
    <p>{post.body}</p>  
  </li>  
);
```

You will notice that the key attribute is gone from the `li` element. That is because this attribute will be moved to the `Post` component creation when we finish this refactoring. React doesn't really differentiate between HTML elements and components we we write JSX code. Let's see that now by changing the JSX code from `home.jsx`.

```jsx
// src/home.jsx  
import React from 'react';  

import { Post } from './post';
import { useJsonPlaceholder } from './useJsonPlaceholder';  
  
export const Home = ({ user }) => {  
  const [loading, posts] = useJsonPlaceholder("https://jsonplaceholder.typicode.com/posts");  
  
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      {loading ? null : (
        <ul>
          {/* This has become a little bit shorter */}
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );  
};
```

### Showing a single post
We now have a way to load a user and a list of posts. But what about loading a single post for a user to view? Imagine that a user clicks one one of the titles for the posts, we would likely like to be able to show the post by itself with more details if we had access to more. Let's try coding that with the component we extracted in the last section.

First, let's create a new component to show a single post. To do so, create a file named `singlePost.jsx` in the `src` folder and add the following code to enable fetching that post.

```jsx
// src/singlePost.jsx  
import React from 'react';  
  
import { useJsonPlaceholder } from './useJsonPlaceholder';  
import { Post } from './post';  
  
export const SinglePost = ({ postId }) => {  
  const [loading, post] = useJsonPlaceholder("https://jsonplaceholder.typicode.com/posts/" + postId);  
  
  return loading ? null : <Post post={post} />;  
};
```

Again using our generic hook, we fetch the post and display it using our `Post` component. Notice how we do not need to provide the key here, since we do not use arrays, React does not need the key property to order anything.

Next, let's modify the `home.jsx` file to be able to show either the post list, or the single post. To do so, we also need to modify the `post.jsx` file to add some click functionality. We want to trigger some function when the title is clicked, so we will need to receive a prop to do so and handle the `onclick` event of the title node.

```jsx
// src/post.jsx
import React from 'react';  
  
export const Post = ({ post, onClick }) => (  
  <li>  
    <a onClick={() => onClick(post)}>{post.title}</a>  
    <p>{post.body}</p>  
  </li>  
);
```

React handles events a little differently from what we would expect normal HTML node. The biggest difference is that is uses camelCase rather than all lowercase for event names. You can read more about the differences in [the docs](https://reactjs.org/docs/events.html). In this case, we ignore most of the differences and use a simple function to call the `onClick` prop with the selected post.

Now that we have modified our post, let's add some state to the `Home` component to show the `SinglePost` when a user clicks on a post.

```jsx
// src/home.jsx
import React, { useState } from 'react';  
  
import { useJsonPlaceholder } from './useJsonPlaceholder';  
import { Post } from './post';  
import { SinglePost } from './singlePost';  
  
export const Home = ({ user }) => {  
  const [loading, posts] = useJsonPlaceholder("https://jsonplaceholder.typicode.com/posts");  
  const [selected, setSelected] = useState(null);  
  
  if (selected) {  
    return (  
      <SinglePost postId={selected.id} />  
    );  
  }  
    
  return (  
    <div>  
      <h1>Welcome {user.name}</h1>  
      {loading ? null : (  
        <ul>  
          {posts.map(post => (  
            <Post key={post.id} post={post} onClick={post => setSelected(post)} />  
          ))}  
        </ul>  
      )}  
    </div>  
  );  
};
```

With this code added, we can not keep in state the selected post when a user clicks on a title. Using a function that we pass to the `onClick` property of the `Post` component, we can use the state setter to select a post. When the component function will be executed again, `selected` will have a value and render a `SinglePost` instead of the usual list.

As usual, wait some time for parcel to build your changes and try them for yourself in your browser.

Now, we can already see that we will likely want some way to go back to the list and clear the state. Another functionality we'll likely want is to be able to save which post is selected so that when a user refreshes the page, they still see the post they selected. Feel free to play with this version of the tutorial and try to implement those features yourself. However, you will notice that this gets very heavy and tedious. When you are ready, jump to the next section to see how we can solve those issues.

### Routing to the rescue
Let's revert back to the code we created in the [Adding some code reuse](#adding-some-code-reuse) section and see how we could achieve the same functionality using react-router instead.

React-router is a routing solution for React. Using the provided components and hooks, we are able to control the browser URL without ever needing to refresh the page. For example, let's imagine that, instead of using some state to store the selected post, we instead reverted to a more common method which is to use the URL as our selection. In a more traditional application, clicking on the `a` element containing the title would send the user to the `/post/1` path of the application for the post with id 1. A server would then serve us some HTML containing the content of this post and reverting would again refresh the page to show us the list. Suddenly, we have implemented all the functionalities we wanted from the previous section with very little effort.

One of the big advantages of using a client framework like React is to make pages more dynamic - more reactive if you will - by removing all those calls to the server and page refreshes. Instead, the user is never forcefully kicked out of the application for the next page to load from a server, they are always able to interact with the application until they refresh it. But how can we use the URL to store our selected post without requiring any refresh?

This is where react-router comes in. React-router takes over the URL for us thanks to the [history API](https://developer.mozilla.org/en-US/docs/Web/API/History), allowing us to change it without any refreshes. Let's try to implement the single post component, but with react-router this time. First, recreate the `singlePost.jsx` file as explained in that section, but change the content to the code bellow.

```jsx
// src/singlePost.jsx
import React from 'react';  
import { useParams }  from 'react-router-dom';  
  
import { useJsonPlaceholder } from './useJsonPlaceholder';  
import { Post } from './post';  
  
export const SinglePost = () => {  
  const { id } = useParams();  
  const [loading, post] = useJsonPlaceholder("https://jsonplaceholder.typicode.com/posts/" + id);  
  
  return loading ? null : <Post post={post} />;  
};
```

Rather than use a prop to get the post id, we instead use the hook from `react-router` called `useParams`. What this hook allows us to do is extract parameters from the path. For example, it would extract the id 1 from the path `/post/1`, giving us the ability to extract the right post for the URL. We will see later how to configure these parameters.

Let's now look at the `post.jsx` file again and change the code to use react-router.

```jsx
// src/post.jsx
import React from 'react';
import { Link } from 'react-router-dom';
  
export const Post = ({ post }) => (  
  <li>  
    <Link to={"/post/" + post.id}>{post.title}</Link>  
    <p>{post.body}</p>  
  </li>  
);
```

In this new code, we import the `Link` component from react-router instead of rendering an `a` tag. When React takes over, the `Link` component will still render as an `a` tag, but when clicked, it will change the path part of the URL to the path given in the `to` property. For example, if we were rendering the post at id 2, the `to` property would be `/post/2`.

Finally, we will modify the `App` component in the `app.jsx` to provide us the routing capabilities of react-router. Open that file and copy the following code into it.

```jsx
// src/app.jsx
import React from 'react';  
import { BrowserRouter, Switch, Route } from 'react-router-dom';  
  
import { useJsonPlaceholder } from './useJsonPlaceholder';  
import { Home } from './home';  
import { SinglePost } from './singlePost';  
  
export const App = () => {  
  const [loading, user] = useJsonPlaceholder("https://jsonplaceholder.typicode.com/users/1");

  return loading ? (
    <div>
      loading...
    </div>
  ) : (
    <BrowserRouter>
      <Switch>
        <Route path="/post/:id">
          <SinglePost />
        </Route>
        <Route path="/">
          <Home user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
```

We've added a lot. Let's look at each element in order. First, we've imported and added a `BrowserRouter` component from `react-router`. This component is what provides react-router with the history API and must be one of the first component in your application. React-router will trigger many warning if you add anything from react-router outside of the children of the `BrowserRouter`, so make sure you remember to always have it as up the tree as possible.

Next, we've imported and added the `Switch` component. This component acts just like a normal JavaScript switch statement. The first `Route` that matches the URL will be rendered and the other ignored. We'll see how that works in the next paragraph.

Finally, we create two `Route` components, `<Route path="/post/:id">` and `<Route path="/">`. A route is like an if statement. It will look at the current URL and see if the path it is given matches the URL in question. For example, if we provided the `/post/1` route in the URL, both routes would match as `/` and `/post/:id` are contained in the URL and thus, both of the route's children would be rendered (Where the `/post` URL would not render the `/post/:id` route). We obviously only want one component rendered at a time, so we use a `Switch` component to prevent that.

We glossed over the `/post/:id` path and mentioned that it would match for `/post/id` without explaining why it does match even though both are clearly different. This is because everything starting with a colon ":" in a path for a route is considered a parameter. Internally, react-router will allow anything to match a parameter and it will store that value internally, which can then be accessed by `useParams` as we've seen in the `SinglePost` component. For example, if we have the path `/:type/:id/comment/:commentId` and the URL `/post/1/comment/3`, react-router will match and save `post` for the value of `type`, `1` for the value of `id`, and `3` for the value of `commentId`. You can look at the [official documentation](https://reacttraining.com/react-router/web/example/url-params) for more information on the syntax for parameters.

Try the application in your browser after parcel has built it. You will see we have access to the same level of functionality as the previous section, but it is far more robust and easy to work with.

## Conclusion
Today we discovered React and the component model, saw how to use those concepts to create a real-ish application, and discovered the possibilities that hooks, state management, and routing brings to the table. With this tutorial completed, you now have the tools to be able to go through the application in this repository and reuse the knowledge you have gained to build your own applications!

Happy hacking.
