# User management
The application component stores the user inside of its state. When a user has logged in, it sets the user inside of its state and will remove it when the user logs out.

You can try the login mechanism by trying to log-in with one of the following users:

- Student user, username: student@carleton.ca, password: <leave empty>.
- Instructor user, username: admin@carleton.ca, password: <leave empty>.

The student stored inside the state has the following structure:

```typescript
interface User {
  name: string;
  role: 'student'|'admin';
  email: string;
  avatar: string;
}
```

# Course content management
The application component also stores the entire course content loaded from the `courseContent.js` file. It uses a special type of state management system called a reducer to change the state on demand.

Check the course content documentation for more details.

The structure for the course content is as follows:

```typescript
interface Content {
  title: string;
  url?: string;
}

interface Lecture {
  id: number;
  unit: string;
  slides?: Content[];
  recordings?: Content[];
  code?: Content[];
}

interface Tutorial {
  id: number;
  name: string;
  term?: string;
  specfile: Content;
  resources?: Content[];
}

interface Assignment {
  id: number;
  name: string;
  term?: string;
  specfile: Content;
  resources?: Content[];
}

interface Comment {
  id: number;
  user: string;
  content: string;
}

interface Topic {
  id: number;
  title: string;
  comments: Comment[];
}

interface Forum {
  id: number;
  title: string;
  topics: Topic[];
}

interface CourseContent {
  lectures: Lecture[];
  tutorials: Tutorial[];
  assignments: Assignment[];
  forums: Forum[];
}
```