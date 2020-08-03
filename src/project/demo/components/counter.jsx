/** @jsx h */
import { h, withStateReducer } from '../../vdom';

const reducer = ({ action, state }) => {
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

export const Counter = withStateReducer({ count: 0 }, reducer, Comp);
