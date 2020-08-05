/** @jsx h */
import { applyContext, h } from '../../vdom';

const withCallback = (callback, component) => {
  return applyContext(() => ({
    apply(context) {
      return {
        ...context,
        afterMount: () => callback(context),
      };
    }
  }), component);
};

const Username = (_, { username = '' }) => <span>{username}</span>;

export const ApiUsername = withCallback(({ setState }) => {
  setTimeout(() => {
    setState('username', 'Bob');
  }, 1000);
}, Username);
