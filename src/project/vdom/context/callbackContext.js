import '../utils/typeDef';
import { applyContext } from './applyContext';

/**
 * Will add a callback that runs directly after the component has been mounted to a component.
 * @example
 * const Username = (_, { username = '' }) => <span>{username}</span>;
 *
 * export default withCallback(({ setState }) => {
 *   setTimeout(() => {
 *     setState('username', 'some name');
 *   }, 1000);
 * }, Username);
 * @param {function(Object)} callback - Callback to call after the component has mounted, will receive the
 * context at the time of mounting as its first parameter.
 * @param {functionComponent} component - Component to augment.
 * @return {contextObject} Returns a valid context object for augmenting a component.
 */
export const withCallback = (callback, component) => {
  return applyContext(() => ({
    apply(context) {
      return {
        ...context,
        afterMount: () => callback(context),
      };
    }
  }), component);
};
