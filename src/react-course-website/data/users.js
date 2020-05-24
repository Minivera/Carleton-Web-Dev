import gravatar from 'gravatar';

export const users = [
  {
    name: 'admin',
    role: 'admin',
    email: 'admin@carleton.ca',
    avatar: gravatar.url('admin@carleton.ca', { s: '200', r: 'pg', d: 'identicon' }),
  },
  {
    name: 'student',
    role: 'student',
    email: 'student@carleton.ca',
    avatar: gravatar.url('student@carleton.ca', { s: '200', r: 'pg', d: 'identicon' }),
  }
];

export const getUser = username => users.find(user => user.name === username);

export const loginUser = username => new Promise((resolve, reject) => {
  const found = users.find(user => user.email === username);

  setTimeout(() => {
    if (found) {
      return resolve(found);
    }
    return reject(new Error('Invalid login'));
  }, 1300);
});
