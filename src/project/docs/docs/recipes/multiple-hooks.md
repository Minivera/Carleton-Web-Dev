---
title: "Recipes: Multiple lifecycle hooks per component"
---

As we have seen in the [context overview](/context/overview), lifecycle hooks can only be set once through context
. This is very limiting for certain use cases as, for example, a developer may want to be able to create a library
 that adds context functionalities, but they would prefer that this library do not overwrite the user code.

Thankfully, this behavior can be very quickly change by using monkey patching, let's see how that can be done:

```javascript
const withSomeContext = (component) => {
  return applyContext(() => ({
    apply({ afterMount, ...rest }) {
      return {
        ...rest, // Do not forget to pass along the context you are not using!
        afterMount: context => {
          // Do your logic
          if (typeof afterMount === 'function') {
            afterMount.call(this, context);
          } 
        },
      };
    }
  }), component);
};
```

By keeping a reference to the previous `afterMount` hook, we can call our own logic and then trigger the previous
 hook's function. Since the hook may not be defined, checking its type ensures we do not try to execute an `undefined
 ` variable. Furthermore, all hooks have the component they are called from as their `this` property, so we need to
 make sure to pass it along by using `call`.
