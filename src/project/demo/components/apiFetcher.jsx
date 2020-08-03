/** @jsx h */
import { h, withCallback } from '../../vdom';

const Username = (_, { username = '' }) => <span>{username}</span>;

export const ApiUsername = withCallback(({ setState }) => {
  setTimeout(() => {
    setState('username', 'Bob');
  }, 1000);
}, Username);
