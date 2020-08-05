---
title: "Context: State with reducers"
---

One common pattern with state machines is to use what is called a `reducer` to process or state based on atomic
 actions. For example, imagine a counter. We can increment or decrement our counter, but we want to do so in a way
 that is more predictable than with `setState`. We first define some state we want to watch.

```javascript
const state = { count: 0 };
```

Our state is an object with a count property, nothing more. We can then define a function called a reducer, which
 takes two arguments. One is the current state, and the other is an action. The action is an object containing
 whatever we need to process the state change, plus an attribute called `type` to tell us what the action _is_. Let's
 write what the reducer for our counter should be.

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
```

Reducer are most often defined with a `switch` statement. We switch on the action's type, then execute the state
 change while making sure to create a copy of the previous state. Care must be taken to never mutate the state and
 instead return a new object altogether. This makes sure state changes are predictable and have no side effects.

Finally, we define a `dispatch` function. This function will take an action and execute our reducer on
 the current state.

```javascript
const dispatch = action => state = reducer(state, action);
```

And we're done! With this, we have an easy to reason with system and our counter. Let's see how we can use it with
 context and VirtualDOM.

```jsx
/** @jsx h */
import { applyContext, h } from 'VirtualDOM';

const withStateReducer = (defaultState, reducer, component) => {
  return applyContext(() => ({
    savedState: defaultState,

    apply({ requestUpdate, ...rest }) {
      return {
        ...rest,
        ...this.savedState,
        dispatch: action => {
          this.savedState = reducer(this.savedState, action);
          requestUpdate();
        },
        requestUpdate,
      };
    }
  }), component);
};

// This is the reducer we used previously
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const Comp = (_, { count, dispatch }) => {
  return (
    <div>
      <h1>Count is: {count}</h1>
      <button onclick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onclick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

const Counter = withStateReducer({ count: 0 }, reducer, Comp);
```

We can see our state moved to the `withStateReducer` call. The dispatch method moved to the context object. Rather
 than save the state inside of some global object, we instead save it in the context object memory. When the user
 component this dispatch method in one of the buttons, we will update our saved state by executing the reducer and
 trigger an update.
