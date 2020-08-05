---
title: "Context: Callbacks"
---

As we've seen in the context overview, context objects can be used to make sure callbacks are only executed once. Let's 
review this example ans see if there are any ways to improve this behavior to be even more useful.

```javascript
export const withCallback = (callback, component) => {
  return applyContext(() => ({
    apply(context) {
      return {
        ...context,
        afterMount: callback,
      };
    }
  }), component);
};

const AugmentedComponent = withCallback(() => {
  // Do something, but only once!
}, component);
```

In its simplest form, this context allows a developer to provide a callback and this callback, and it will only be
 executed once after the component has mounted. What if we wanted to call this callback again in case something
 changes on the component? For example, if we fetch a user with this callback, we might want to trigger the fetch
 again if the id ever changes. We can do this easily by using the context memory.
 
```javascript
// TODO validate this example
export const withMemoizedCallback = (callback, dependencies, component) => {
  return applyContext(() => ({
    watched: {},
    watching: false,

    triggerCallback(context) {
      const merged = {...this.props, ...context};

      // If we are watching
      if (this.watching) {
        if (Object.keys(merged).filter(key => dependencies.includes(keys)).find(
          key => watched[key] !== merged[key])
        ) {
          // Check if any of the keys we watch, and if we find one that doesn't match,
          // trigger the watching process again
          this.watching = false;
        }
      }

      if (!this.watching) {
        callback.call(this, context);
        this.watching = true;
    
        // Save the values of the watched dependencies, if they exist
        Object.keys(merged).filter(key => dependencies.includes(keys)).forEach(key => {
          watched[key] = merged[key];
        });
      }
    },

    apply(context) {
      return {
        ...context,
        afterMount: triggerCallback,
        afterUpdate: triggerCallback,
      };
    }
  }), component);
};

const AugmentedComponent = withCallback(() => {
  // Do something at mount time and every time userId changes.
  fetch(`/api/${this.props.userid}`).then(...);
}, ['userid'], component)
```

Lots to unpack here. Before we do so, you can see that, in this example, we use the context object to store our watched
 attributes. We could very easily use state here, but this would expose our watched attributes in the context.

Let's first look at the `apply` function, here we simply return the context with two hooks set. We want to make sure
 to trigger the callback on mount, but also on every update, so we can retrigger said callback if our attributes
 change.

Next, we have the `triggerCallback` function. This function is divided into two parts. The second part, starting at
 the `if (!this.watching) {` statement, will trigger the callback if we are not waiting for the attributes to change
 . It will also save the value of the properties or context elements we are watching when the callback triggers.

The first part of the function will be executed on every update as long as we are watching for changes. It will
 compare the context and properties of the component with the values we were saving previously and trigger a new
 watch cycle if those ever change.
