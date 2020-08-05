---
title: "Context: Introduction"
---

The context is an object stored in the component custom element. This object is passed on every execution of a
 component's function and - contrary to properties which are cloned on every execution - can be safely mutated
 . Mutating the context is the main way the framework provides state management capabilities. However, it allows
 enables developers to hook into the component lifecycle methods and to provide more APIs through the use of this
 mutable memory. This makes components indefinitely expandable and can provide any functionality you can think of, 
 _in theory at least_.

## Getting started with context
Context, in is simplest of forms, is an object with an `apply` function that will be executed in every render cycle
. If applied to components using the helper function `applyContext`, they can be chained together to give virtually
 an infinite number of context objects to a component.

For example, imagine that we want to provide some API data to a component:

```jsx
const ComponentWithAPIData = (_, { data, setState }) => {
  if (!data) {
    fetch('some/api/url').then(data => data.json()).then(data => setState('data', data));
  }

  // Do something with that data
}; 
```

If we want to reuse this logic in multiple components, we end up rewriting a lot of code. This type of behavior is
 also very difficult to test in isolation. There's also the fact that we have no way to make sure the fetch
 function will only be called once, which may lead to infinite loops or refetching. This is less of an issue with
 VirtualDOM since all components update in isolation, bu tit is still something we want to prevent if possible. Let's
 rewrite this by using context instead.

```javascript
import { applyContext } from 'VirtualDOM';

const withAPI = (component) => {
  return applyContext(() => ({
    fetchData(setState) {
      fetch('some/api/url').then(data => data.json()).then(data => {
        setState('data', data);
      });
    }, 

    apply({ setState, ...rest }) {
      // Always return the rest of the context plus anything you extracted from it.
      return {
        ...rest,
        setState, // Do not forget to return the setState method as well!
        afterMount: () => {
          this.fetchData(setState);
        },
      };
    }
  }), component);
};

const ComponentWithAPIData = withAPI((_, { data }) => {
  // Do something with that data
});
```

`withAPI` is our context function. It should return a call to the `applyContext` helper with two parameters, a context
 creator and the component to augment with context. The context creator is a function that should return the context
 object, it is called everytime a component is created using the `h` function. This makes sure all instances of
 a component have their own copy of the context object, rather than all share the same one.

The context object is where we will work our magic to anything we want to the context of an object. This object is
 stored in memory for as long as the component exists. Anything we save in there is unique to that component and will
 follow it through updates. If the component is ever unmounted (If it is removed from the tree for example), its
 context is deleted as well. Even better, we still have access to state management for the component inside of its
 context object, meaning we can use the component state to save data rather than the context memory. The built-in
 state options should cover most use cases, but we'll see in a later guide how context memory can also be used to
 provide more complex APIs.

The `apply` function will be, as explained before, called everytime the function component is executed. It receives
 the previous context and must return an updated context. The first apply function called will receive the context
 object with the component's state, the `setState` method and a `requestUpdate` function. This function allows the
 caller to trigger an update on the component without setting any state, which is particulary useful when storing
 data in context memory rather than the state.

These functions are called in order of applications. Let's explain that with an example:

```javascript
const augmentedComponent = withContext1(withContext2(component));
```

Here, `withContext2`'s `apply` function will be called first, then `withContext1`'s `apply` function second. If
 `withContext2` adds anything to the context, `withContext1` can overwrite it if we are not careful. This is why you
 should always return the complete context with your added changes from an `apply` function.

## Lifecycle hooks
Context objects can do a lot more than just add more state to a component. They can also hook into lifecycle methods
. In the previous example, we triggered our API fetch from a property on the context called `afterMount`. This is a
 lifecycle hook. By returning an object with any of the lifecycle hooks set, the component will call these functions
 at specific moment in its lifecycle. In this case, we trigger the fetch only after the component has rendered once
 and been mounted on the DOM, and we can be sure this function will never execute again while the component exists.

All lifecycle hooks have the current component context as their only attribute and their `this` property will be
 bound to the custom element instance. Let's list all the lifecycle methods that are available from the context object:

| **Hook**           | **Parameters**           | **Description**                                                                                                                                                                                                                                    |
|--------------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `afterConnect`     | Context on the component | Triggered after the component has been connected to a DOM element, but before it is mounted. The virtual tree has not been rendered yet and this executes before the function component is executed. The component might not exist in the DOM yet. |
| `beforeMount`      | Context on the component | Triggered before VirtualDOM mounts this component's tree to the DOM, but after the component function has been executed.                                                                                                                           |
| `afterMount`       | Context on the component | Triggered after VirtualDOM has mounted to the DOM.                                                                                                                                                                                                 |
| `beforeUpdate`     | Context on the component | Triggered before the component is set to update. The component function has yet to be re-executed at this point.                                                                                                                                   |
| `shouldUpdate`     | Context on the component | Triggered every time an update is requested. If this hooks return true, the update cycle will stop for this component.                                                                                                                             |
| `afterUpdate`      | Context on the component | Triggered after the component has been updated, if it was not prevented by `shouldUpdate`.                                                                                                                                                         |
| `beforeDisconnect` | Context on the component | Triggered before the component will disconnect from the DOM. The component might not be available in the DOM at this point, but has yet to be cleaned.                                                                                             |

A developer can only set a hook on the context object once. If chaining contexts together, only the last assignation
 will be processed. Consider a case like this for example:

```javascript
const withContext1 = (component) => {
  return applyContext(() => ({
    apply(context) {
      return {
        ...context,
        afterMount: () => { /* Do something */ },
      };
    }
  }), component);
};

const withContext2 = (component) => {
  return applyContext(() => ({
    apply(context) {
      return {
        ...context,
        afterMount: () => { /* Do something else */ },
      };
    }
  }), component);
};

const AugmentedComponent = withContext1(withContext2(Component));
```

In this specific case, only the `afterMount` function from `withContext1` will be executed since it is added last
. The developer is responsible from changing this default behavior if they want to allow calling multiple lifecycle
 hooks for a single component. See the [Multiple hooks for a single component recipe](/recipes/multiple-hooks) for
 more details.

In the next sections on context, we will explore some context specific recipes and see how the API can be used to
 expand VirtualDOM's API.
