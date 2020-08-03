import '../utils/typeDef';
import { applyContext } from './applyContext';

/**
 * Function that will attach a reducer to the state capabilities of the components. When a component is augmented
 * with this reducer context, a dispatch function will be available for dispatching actions and updating the state.
 * @example
 * const reducer = ({ action, state }) => {
 *   switch (action.type) {
 *     case 'INCREMENT':
 *       return { ...state, count: state.count + 1};
 *     case 'DECREMENT':
 *       return { ...state, count: state.count - 1};
 *     default:
 *       return state
 *   }
 * }
 *
 * const Comp = (_, { count, dispatch }) => {
 *   return (
 *     <div>
 *       <h1>Count is: {count}</h1>
 *       <button onclick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
 *       <button onclick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
*      </div>
 *   );
 * };
 *
 * export default withStateReducer({ count: 0 }, reducer, Comp);
 * @param {{}} defaultState - Default values for the state to be managed by the reducer.
 * @param {function({ action: Object, state: Object}): Object} reducer - Reducer function to execute on the state.
 * It will receive an object containing the dispatched action and the current state. It should return an update state
 * without mutating the original state.
 * @param component - Component to augment with a reducer.
 * @return {contextObject} Returns a valid context object for augmenting a component.
 */
export const withStateReducer = (defaultState, reducer, component) => {
  return applyContext(() => ({
    savedState: defaultState,

    apply({ requestUpdate, ...rest }) {
      return {
        ...rest,
        ...this.savedState,
        dispatch: action => {
          this.savedState = reducer({ action, state: this.savedState });
          requestUpdate();
        },
        requestUpdate,
      };
    }
  }), component);
};
